import { Download, ExternalLink, FileText } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import DownloadSummaryButton from './download-summary';

const SourceInfo = ({
  fileName,
  original_fileURL,
  title,
  summary_text,
  createdAt,
}: {
  fileName: string;
  original_fileURL: string;
  title: string;
  summary_text: string;
  createdAt: string;
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button className="">
          <a
            href={original_fileURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </a>
        </Button>
        {/* <Button>
          <a
            // href={original_fileURL}
            // target="_blank"
            download
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </a>
        </Button> */}
        <DownloadSummaryButton
          title={title}
          summary_text={summary_text}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
};

export default SourceInfo;
