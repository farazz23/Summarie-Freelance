import { getDBConnection } from "./dbConnection";

export async function getSummaries(userId: string) {
  const sql = await getDBConnection();
  const summaries = await sql`SELECT * FROM pdf_summaries where user_id= ${userId} ORDER BY created_at DESC`;
  return summaries;
}
