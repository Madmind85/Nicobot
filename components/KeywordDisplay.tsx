
import React from 'react';
import { FileIcon } from './icons';

interface KeywordDisplayProps {
  keywords: string[];
  fileName: string;
}

const KeywordDisplay: React.FC<KeywordDisplayProps> = ({ keywords, fileName }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
              <FileIcon />
          </div>
          <div>
            <h3 className="font-semibold text-slate-300">Analysis complete for:</h3>
            <p className="text-sm text-cyan-400 truncate">{fileName}</p>
          </div>
      </div>
      <h2 className="text-xl font-bold text-slate-200 mb-4">Extracted Keywords & Topics</h2>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="bg-slate-700 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordDisplay;
