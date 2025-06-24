import { parseEmojiPoint } from '@/utils/summary-helper';
import React from 'react';

interface ContentSectionProps {
  title: string;
  points: string[];
}
interface ParagraphProps {
  point: string;
}

const EmojiPoint = ({ point }: ParagraphProps) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.00] to-gray-400/[0.3] p-4 rounded-3xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: ParagraphProps) => {
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.00] to-gray-400/[0.3] p-4 rounded-3xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      <p className=" relative text-left text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
        {point}
      </p>
    </div>
  );
};

const ContentSection = ({ title, points }: ContentSectionProps) => {
  const cleanedPoints = points.flatMap((point) =>
    point
      .split(' - ')
      .map((p) => p.trim())
      .filter(Boolean)
  );

  return (
    <div className="space-y-4 ">
      {cleanedPoints.map((point, index) => {
        const isEmojiPoint = parseEmojiPoint(point);
        if (isEmojiPoint) {
          return <EmojiPoint key={index} point={point} />;
        }
        return <RegularPoint key={index} point={point} />;
      })}
    </div>
  );
};

export default ContentSection;
