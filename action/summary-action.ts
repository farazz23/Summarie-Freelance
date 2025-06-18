'use server'

import { getDBConnection } from "@/lib/dbConnection"
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { success } from "zod/v4";

export async function deleteSummaryAction({ summaryId }: { summaryId: string }) {
  try {
    //delete path
    const user = await currentUser();
    if (!user?.id) {
      throw new Error('User not found')
    }
    const sql = await getDBConnection();
    const result = await sql`
    DELETE FROM pdf_summaries
    WHERE id = ${summaryId} AND user_id = ${user?.id}
    RETURNING id;`

    //revalidatepath
    if (result.length > 0) {
      revalidatePath('/dashboard')
      return {
        success: true
      }
    }
    return {
      success: true
    }
  } catch (error) {
    console.log(error)
    return {

      success: false
    }
  }

}