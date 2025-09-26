import React from 'react';

interface SeoDisplayProps {
  titles: string[];
  keywords: string;
}

const SeoDisplay: React.FC<SeoDisplayProps> = ({ titles, keywords }) => {
  return (
    <div className="space-y-6 pt-6 border-t border-violet-800">
      <div>
        <h3 className="text-xl font-bold text-indigo-100 mb-3">
          Titoli SEO-Friendly
        </h3>
        <ul className="space-y-2 list-disc list-inside text-indigo-200">
          {titles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-indigo-100 mb-3">
          Keywords SEO
        </h3>
        <div className="p-3 bg-indigo-900/70 rounded-md">
            <p className="text-fuchsia-300 font-mono text-sm break-words">
                {keywords}
            </p>
        </div>
      </div>
    </div>
  );
};

export default SeoDisplay;