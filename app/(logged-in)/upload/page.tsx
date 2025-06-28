import BgGradient from '@/components/common/BgGradient';
import { MotionDiv } from '@/components/common/motion-wrapper';
import UploadForm from '@/components/upload/UploadForm';
import UploadHeader from '@/components/upload/UploadHeader';
import { hasReachedUploadLimits } from '@/lib/users';
import { containerVarients, itemVariants } from '@/utils/constants';
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
      <MotionDiv
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-8"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
};

export default UploadPage;
