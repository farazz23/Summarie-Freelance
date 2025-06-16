import BgGradient from '@/components/common/BgGradient';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Button } from '@/components/ui/button';
import { getSummaries } from '@/lib/summaries';
import { currentUser } from '@clerk/nextjs/server';
import { ArrowRight, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const uploadLimit = 5;
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect('/sign-in');
  }
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-400 via-teal-400 to-cyan-500" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="tet-4xl font-bold tracking-tight bg-linear-to-t from-rose-500 to-rose-950 bg-clip-text text-transparent">
                Your Summary
              </h1>
              <p className="text-gray-600">
                Transform yout PDF's into consise, actionable, insights
              </p>
            </div>

            <Button
              variant={'link'}
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-500 hover:scale-105 hover:transition-all duration-300 group hover:no-underline"
            >
              <Link href="/upload" className="flex text-white items-center">
                <PlusIcon className="h-5 w-5 mr-2" />{' '}
                <span className="">New Summary</span>
              </Link>
            </Button>
          </div>
          <div className="mb-6 ">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You've reched the limit of 5 upload on the Basic plan.{' '}
                <Link
                  href="/#pricing"
                  className="text-rose-400 underline font-medium underline-offset-4 inline-flex items-center"
                >
                  Click here to Upgrade to pro{'  '}
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>{' '}
                for unlimited uploads
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
