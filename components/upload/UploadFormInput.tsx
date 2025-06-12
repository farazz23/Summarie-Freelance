'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface UploadFormInputes {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const UploadFormInput = ({ onSubmit }: UploadFormInputes) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button>Upload Your PDF</Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
