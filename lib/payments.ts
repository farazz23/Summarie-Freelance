import Stripe from 'stripe';
import { getDBConnection } from './dbConnection';

export async function handleSuscriptionDeleted({ subscriptionId, stripe }: {
  subscriptionId: string,
  stripe: Stripe
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDBConnection();
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id=${subscription}`
  } catch (error) {
    console.log("Error handling subscription deleted: ", subscriptionId);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  try {
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);

    const priceId = session.line_items?.data[0]?.price?.id;

    if (!customer || !('email' in customer) || !priceId) {
      console.error('Missing customer details or priceId:', { customer, priceId });
      return;
    }

    const email = customer.email as string;
    const fullName = customer.name as string;
    const sql = await getDBConnection();

    console.log('Creating/Updating user in database...');
    await createOrUpdateUser({
      sql,
      email,
      fullName,
      customerId,
      priceId,
      status: 'active',
    });

    console.log('Creating payment record...');
    await createPayment({
      sql,
      session,
      priceId,
      userEmail: email,
    });

    console.log('Checkout session processing completed successfully.');
  } catch (error: any) {
    console.error('Error in handleCheckoutSessionCompleted:', error);
  }
}
async function createOrUpdateUser({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      console.log('User not found, inserting new user...');
      await sql
        `INSERT INTO users(email, fullname, customer_id, price_id, status)
      VALUES(${email}, ${fullName}, ${customerId}, ${priceId}, ${status});`

    } else {
      console.log('User already exists, skipping insert.');
    }
  } catch (error: any) {
    console.error('Error in createOrUpdateUser:', error);
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const { amount_total, id, status } = session;

    if (!amount_total || !id || !status) {
      console.error('Missing payment session details:', { amount_total, id, status });
      return;
    }

    await sql
      `INSERT INTO payment(amount, status, stripe_payment_id, price_id, user_email)
    VALUES(${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail});`


    console.log('Payment record created successfully.');
  } catch (error: any) {
    console.error('Error in createPayment:', error);
  }
}