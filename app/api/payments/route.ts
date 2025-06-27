// Stripe Webhook Route - app/api/webhook/route.ts

import { handleCheckoutSessionCompleted, handleSuscriptionDeleted } from '@/lib/payments';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);

    console.log("EVENT RECEIVED:", event.type);
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Checkout Session Completed');
        const sessionID = event.data.object.id;


        // Retrieve session and line items properly
        const session = await stripe.checkout.sessions.retrieve(sessionID, {
          expand: ['line_items']
        });


        await handleCheckoutSessionCompleted({ session, stripe });
        break;

      case 'customer.subscription.deleted':
        console.log('Customer Subscription deleted....');
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;

        await handleSuscriptionDeleted({ subscriptionId, stripe })

        console.log("Cancel the subscription");
        console.log(subscription);


        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('❌ Webhook Error:', error);
    return NextResponse.json(
      { success: false, message: 'Webhook Error', error },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
};
