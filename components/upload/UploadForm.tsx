'use client';
import React from 'react';
import UploadFormInput from './UploadFormInput';
import { z } from 'zod/v4';
import { useUploadThing } from '@/utils/uploadthing';

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
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      console.log('uploaded successfully!');
    },
    onUploadError: () => {
      console.log('error occurred while uploading');
    },
    onUploadBegin: ({ file }) => {
      console.log('upload has begun for', file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    //validating the fields
    const validatingFields = Schema.safeParse({ file });
    console.log(validatingFields);
    if (!validatingFields.success) {
      console.log(
        validatingFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file'
      );
    }

    // upload the file to the server
    const response = await startUpload([file]);
    if (!response) {
      return;
    }
    // parse the pdf using lang chain
    // summarize the pdf using AI
    // save the summary to the database
    // redirect to the [id] summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
