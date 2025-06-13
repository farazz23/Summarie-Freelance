'use client';
import React from 'react';
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
    const loadingToast = toast.loading('Presessing the PDF... ');
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    // TODO: validating the fields
    const validatingFields = Schema.safeParse({ file });
    console.log('validatingFields: ', validatingFields);
    if (!validatingFields.success) {
      toast.error(
        validatingFields.error.flatten().fieldErrors.file?.[0] ??
          'Check your file.'
      );
      toast.dismiss(loadingToast);
      return;
    }

    // TODO: upload the file to the server
    const resp = await startUpload([file]);
    console.log('resp', resp);

    if (!resp) {
      toast.error('Upload failed');
      toast.dismiss(loadingToast);
      return;
    }

    // TODO: parse the pdf using lang chain
    const result = await generatePDFSummary(resp);
    if (result.success) {
      toast.dismiss(loadingToast);
      toast.success('PDF Successfully processed!');
      console.log('📄Extracted Text:\n', result.data);
    } else {
      toast.dismiss(loadingToast);
      toast.error('Processing failed');
    }

    // TODO:  summarize the pdf using AI
    // TODO: save the summary to the database
    // TODO: redirect to the [id] summary page

    // TODO: Clean the Input Space
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
