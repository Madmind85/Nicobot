
import { STOP_WORDS } from '../constants';

export const extractKeywords = (text: string, maxKeywords: number): string[] => {
  if (!text) {
    return [];
  }

  const wordCounts: { [key: string]: number } = {};
  
  // Normalize text: lowercase, remove punctuation, split into words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/);

  // Count word frequencies, ignoring stop words and short words
  for (const word of words) {
    if (word.length > 2 && !STOP_WORDS.has(word) && !/^\d+$/.test(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  }

  // Sort words by frequency in descending order
  const sortedKeywords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);

  // Return the top N keywords
  return sortedKeywords.slice(0, maxKeywords);
};
