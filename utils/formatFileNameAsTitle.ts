export function formatFileNameAsTitle(fileName: string): string {
  // Remove file extension (e.g., ".pdf")
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

  // Replace underscores/dashes with spaces and insert space between camelCase
  const normalized = withoutExtension
    .replace(/[-_]+/g, ' ')                     // replace - and _ with space
    .replace(/([a-z])([A-Z])/g, '$1 $2')        // split camelCase into words

  // Capitalize first letter of each word and join with spaces
  return normalized
    .split(' ')
    .filter(Boolean) // remove any empty strings
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}