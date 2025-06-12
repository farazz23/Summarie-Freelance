'use client';
import React from 'react';
import UploadFormInput from './UploadFormInput';

const UploadForm = () => {
  const handleSubmit = () => {
    console.log('submitted');
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
