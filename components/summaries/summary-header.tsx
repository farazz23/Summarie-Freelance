import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Calendar, ChevronLeft, Clock, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

const SummaryHeader = ({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: string;
  readingTime: number;
}) => {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">AI Summary</p>
          </Badge>
          <div className="flex gap-2 items-center text-sm text-muted-foreground py-2">
            <Calendar className="h-4 w-4 text-rose-400 " />
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex gap-2 items-center text-sm text-muted-foreground py-2">
            <Clock className="h-4 w-4 text-rose-400 " />
            {readingTime} min Read
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-bold bg-linear-to-r from-rose-500 via-orange-400 to-rose-500 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <div className="self-start">
        <Link href="/dashboard">
          <Button
            variant={'link'}
            size={'sm'}
            className="group flex items-center gap-1 sm:gap-2 hovre:bg-white-/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xsx hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3 hover:no-underline"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:translate-x-0.5" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Back <span className="hidden sm:inline">to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryHeader;
