'use client';
import React, { useRef } from 'react';
import UploadFormInput from './UploadFormInput';
import { z } from 'zod/v4';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'react-hot-toast';
import { generatePDFSummary } from '@/action/upload-action';

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
  const fileInputRef = useRef<HTMLFormElement>(null);
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onUploadBegin: ({ file }: any) => {
      toast.success('Upload has just begun ');
    },
    onClientUploadComplete: () => {
      toast.success('Uploaded successfully!');
    },
    onUploadError: (err: any) => {
      toast.error('Error occurred while uploading');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      // toast.dismiss(loadingToast);
      return;
    }

    // TODO: 2. upload the file to the server i.e (uploadthing)
    const resp = await startUpload([file]);
    console.log('resp', resp);

    if (!resp) {
      toast.error('Upload failed');
      // toast.dismiss(loadingToast);
      return;
    }

    const loadingToast = toast.loading('Processing PDF');
    // TODO: 3.parse the pdf using lang chain
    const result = await generatePDFSummary(resp);
    if (result.success) {
      toast.dismiss(loadingToast);
      toast.success(result.message);
      console.log('📄Extracted Text:\n', result.data);
      fileInputRef?.current?.reset();
    } else {
      toast.dismiss(loadingToast);
      toast.error(result.message);
    }

    // TODO:  4. summarize the pdf using AI
    // TODO: 5. save the summary to the database
    // TODO: 6. redirect to the [id] summary page

    // TODO: 7. Clean the Input Space
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} ref={fileInputRef} />
    </div>
  );
};

export default UploadForm;
