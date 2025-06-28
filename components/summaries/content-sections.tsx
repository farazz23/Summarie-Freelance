import { parseEmojiPoint } from '@/utils/summary-helper';
import React from 'react';
import { MotionDiv } from '../common/motion-wrapper';
import { containerVarients, itemVariants } from '@/utils/constants';

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
    <MotionDiv
      variants={itemVariants}
      className="group relative bg-linear-to-br from-gray-200/[0.00] to-gray-400/[0.3] p-4 rounded-3xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </MotionDiv>
  );
};

const RegularPoint = ({ point }: ParagraphProps) => {
  return (
    <MotionDiv
      variants={itemVariants}
      className="group relative bg-linear-to-br from-gray-200/[0.00] to-gray-400/[0.3] p-4 rounded-3xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      <p className=" relative text-left text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
        {point}
      </p>
    </MotionDiv>
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
    <MotionDiv
      variants={containerVarients}
      key={points.join('')}
      initial="hidden"
      whileInView="visible"
      animate="visible"
      exit="exit"
      className="space-y-4 "
    >
      {cleanedPoints.map((point, index) => {
        const isEmojiPoint = parseEmojiPoint(point);
        if (isEmojiPoint) {
          return <EmojiPoint key={index} point={point} />;
        }
        return <RegularPoint key={index} point={point} />;
      })}
    </MotionDiv>
  );
};

export default ContentSection;
