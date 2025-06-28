'use client';
import React, { useRef } from 'react';
import UploadFormInput from './UploadFormInput';
import { z } from 'zod/v4';
import { useUploadThing } from '@/utils/uploadthing';
// import { toast } from 'react-hot-toast';
import {
  generatePDFSummary,
  generatePDFText,
  storePDFSumaryAction,
} from '@/action/upload-action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatFileNameAsTitle } from '@/utils/formatFileNameAsTitle';

const Schema = z.object({
  file: z
    .instanceof(File, { message: 'Invlid File Type' })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      'File size must be less than 20MB'
    )
    .refine(
      (file) => file.type.startsWith('application/pdf'),
      'File must be a PDF'
    ),
});

const UploadForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLFormElement>(null);

  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    // onUploadBegin: ({ file }: any) => {
    //   toast('Upload has just begun ');
    // },
    onClientUploadComplete: () => {
      toast('Uploaded successfully!');
    },
    onUploadError: (err: any) => {
      toast('Error occurred while uploading');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      // TODO: 1. validating the fields
      const validatingFields = Schema.safeParse({ file });
      console.log('validatingFields: ', validatingFields);
      if (!validatingFields.success) {
        toast.error(
          validatingFields.error.flatten().fieldErrors.file?.[0] ??
            'Check your file.'
        );
        return;
      }

      // TODO: 2. upload the file to the server i.e (uploadthing)
      const uploadResp = await startUpload([file]);
      // console.log('resp', resp);
      toast('Uploaded to Server', {
        description: 'Hang on, We are prearing your summary',
      });
      if (!uploadResp) {
        // toast.error('Upload failed');
        toast('Something Went wrong', {
          description: 'Please use a different file',
        });
        return;
      }

      toast('Processing PDF', {
        description: 'Hand tight! Our AI is reading through your document!',
      });

      let storeResult: any;
      fileInputRef.current?.reset();

      const formattedFileName = formatFileNameAsTitle(file.name);

      const result = await generatePDFText({
        fileURL: uploadResp[0].serverData.file.url,
        // fileName: file.name,
      });

      toast('Generating PDF Summary', {
        description: 'Hand tight! Our AI is reading through your document!',
      });

      const summaryResult = await generatePDFSummary({
        pdfText: result?.data?.pdfText ?? '',
        fileName: formattedFileName,
      });

      toast('Saving PDF Summary', {
        description: 'Hand tight! Our AI is reading through your document!',
      });

      const { data = null, message = null } = summaryResult || {};

      if (data?.summary) {
        storeResult = await storePDFSumaryAction({
          fileUrl: uploadResp[0].serverData.file.url,
          summary: data?.summary,
          title: formattedFileName,
          fileName: uploadResp[0].serverData.fileName,
        });
      }

      toast('Summary Generated', {
        description: 'Your PDF has been successfully summarized and saved',
      });
      fileInputRef?.current?.reset();
      // TODO: 6. redirect to the [id] summary page
      router.push(`/summaries/${storeResult.data.id}`);
    } catch (err: any) {
      toast.error(err.message);
      console.log('Error is here ', err);
      fileInputRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} ref={fileInputRef} />
    </div>
  );
};

export default UploadForm;
