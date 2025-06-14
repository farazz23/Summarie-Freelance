'use client';
import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface UploadFormInputes {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputes>(
  ({ onSubmit }, ref) => {
    return (
      <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            required
            className="cursor-pointer"
          />
          <Button>Upload Your PDF</Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
