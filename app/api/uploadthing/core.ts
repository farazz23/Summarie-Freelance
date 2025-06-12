import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next"






const f = createUploadthing();
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '32MB' } })
    .middleware(async (req) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError('Unauthorized')
      return { userID: user.id }
    }).onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userID);
      console.log("file url", file.ufsUrl);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      console.log('file url: ', file.url);
      return { uploadedBy: metadata.userID, file };
    }),
} satisfies FileRouter;


export type OurFileRouter = typeof ourFileRouter