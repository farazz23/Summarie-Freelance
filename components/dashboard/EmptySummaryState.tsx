import { FileText, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const EmptySummaryState = () => {
  return (
    <div className="text-center py-12 flex flex-col items-center gap-4">
      <FileText className="w-16 h-16 text-gray-400" />
      <h3 className="text-xl font-semibold text-gray-600">No Summaries yet</h3>
      <p className="text-gray-500">
        Upload your first PDF to get started with AI-powered summaries
      </p>
      <Button
        variant={'link'}
        className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-500 hover:scale-105 hover:transition-all duration-300 group hover:no-underline"
      >
        <Link href="/upload" className="flex text-white items-center">
          <PlusIcon className="h-5 w-5 mr-2" />{' '}
          <span className="">Create Your First Summary</span>
        </Link>
      </Button>
    </div>
  );
};

export default EmptySummaryState;
