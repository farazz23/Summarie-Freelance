export const parseSection = (section: string): { title: string; points: string[] } => {
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
    points: points.filter(
      (point) => point && !point.startsWith('[Choose]')
    ) as string[],
  };
};

export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[•\-–—]+\s*/, '').trim();

  // This regex captures multiple emoji sequences from the beginning
  const matches = cleanContent.match(/^((?:\p{Extended_Pictographic}\uFE0F?\s*)+)(.+)$/u);

  if (!matches) return null;

  const [_, emojiPart, text] = matches;

  return {
    emoji: emojiPart.trim(),
    text: text.trim(),
  };
}

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();
  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

