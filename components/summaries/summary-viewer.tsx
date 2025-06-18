'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import NavigationControl from './navigation-control';

const parseSection = (section: string) => {
  const [title, ...content] = section.split('\n');
  const cleanTitle = title.startsWith('#')
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];
  let currentPoint = '';
  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('•')) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = '';
    } else {
      currentPoint += ' ' + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());
  return {
    title: cleanTitle,
    points: points.filter((point) => point && !point.startsWith('[Choose]')),
  };
};
const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  const hadnlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  const handleSectionSelect = (index: number) =>
    setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));
  // parsing  Summary
  const sections = summary
    .split('\n# ')
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95  backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <div className="h-full overflow-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6 ">
          <h1>{sections[currentSection]?.title}</h1>
          <ul>
            {sections[currentSection]?.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default SummaryViewer;
