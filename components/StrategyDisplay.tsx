
import React from 'react';

interface StrategyDisplayProps {
  strategy: string;
}

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ strategy }) => {
  const formatStrategy = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        line = line.trim();
        if (line.startsWith('###')) {
          return <h4 key={index} className="text-lg font-semibold text-slate-300 mt-4 mb-1">{line.replace(/###/g, '')}</h4>;
        }
        if (line.startsWith('##')) {
          return <h3 key={index} className="text-xl font-bold text-cyan-400 mt-6 mb-2">{line.replace(/##/g, '')}</h3>;
        }
        if (line.startsWith('* ')) {
          return <li key={index} className="ml-5 list-disc list-outside text-slate-300">{line.substring(2)}</li>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="font-bold text-slate-200 my-2">{line.replace(/\*\*/g, '')}</p>
        }
        return line ? <p key={index} className="my-2 text-slate-300">{line}</p> : <br key={index} />;
      });
  };

  return (
    <div className="animate-fade-in space-y-4 pt-4 border-t border-slate-700">
      <h2 className="text-2xl font-bold text-slate-100">Your AI-Generated Marketing Strategy</h2>
      <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-cyan-400">
        {formatStrategy(strategy)}
      </div>
    </div>
  );
};

export default StrategyDisplay;
