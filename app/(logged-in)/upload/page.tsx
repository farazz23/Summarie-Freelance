import BgGradient from '@/components/common/BgGradient';
import UploadForm from '@/components/upload/UploadForm';
import UploadHeader from '@/components/upload/UploadHeader';
import { hasReachedUploadLimits } from '@/lib/users';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import React from 'react';

const UploadPage = async () => {
  const user = await currentUser();
  if (!user?.id) {
    redirect('/sign-in');
  }
  const userId = user.id;
  const { hasReachedLimits } = await hasReachedUploadLimits(userId);
  if (hasReachedLimits) {
    redirect('/dashboard');
  }
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default UploadPage;
