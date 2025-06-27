import { getDBConnection } from "./dbConnection";

export async function getSummaries(userId: string) {
  const sql = await getDBConnection();
  const summaries = await sql`SELECT * FROM pdf_summaries where user_id= ${userId} ORDER BY created_at DESC`;
  return summaries;
}


export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();
    const [summary] = await sql`SELECT 
        id,
        user_id, 
        original_file_url, 
        summary_text,title,
        status, 
        file_name,
        created_at,updated_at,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
         FROM pdf_summaries where id= ${id} `
    return summary;
  } catch (error: any) {
    console.log(error)
    return {
      success: false
    }
  }
}


export async function getUserUploadCount(user_id: string) {
  const sql = await getDBConnection();
  try {
    const [result] = await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id= ${user_id}`
    return result.count || 0;
  } catch (error: any) {
    console.log('Error fetching user upload count', error)
    return 0;
  }
}