import { pricing_Plans } from "@/utils/constants";
import { getDBConnection } from "./dbConnection";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

export async function getPriceIdFroActiveUser(email: string) {
  const sql = await getDBConnection();
  const querry = await sql`SELECT price_id FROM users WHERE email=${email} AND status = 'active'`;
  return querry?.[0]?.price_id || null
}



export async function hasReachedUploadLimits(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdFroActiveUser(userId);

  const isPro = pricing_Plans.find((plan) => plan.priceId === priceId)?.id === 'pro';
  const uploadLimit = isPro ? 1000 : 5;
  return { hasReachedLimits: uploadCount >= uploadLimit, uploadLimit }
}

export async function hasActivePlan(email: string) {
  const sql = await getDBConnection();
  const querry = await sql`SELECT price_id, status FROM users WHERE email=${email} AND status = 'active' AND price_id IS NOT NULL`;
  return querry && querry.length > 0;
}

export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(user.emailAddresses[0].emailAddress)
  return hasSubscription;
}

