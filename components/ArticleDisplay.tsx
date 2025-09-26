import React from 'react';

type Language = 'IT' | 'EN';

interface ArticleDisplayProps {
  italianArticle: string;
  englishArticle: string;
  activeLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ italianArticle, englishArticle, activeLanguage, onLanguageChange }) => {
  const getArticleContent = () => {
    return activeLanguage === 'IT' ? italianArticle : englishArticle;
  };
  
  const TabButton: React.FC<{lang: Language, children: React.ReactNode}> = ({ lang, children }) => (
    <button
      onClick={() => onLanguageChange(lang)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
        activeLanguage === lang
          ? 'bg-violet-600 text-white'
          : 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-violet-800">
            <h2 className="text-2xl font-bold text-indigo-100">Articolo Generato</h2>
            <div className="flex space-x-2">
                <TabButton lang="IT">Italiano</TabButton>
                <TabButton lang="EN">English</TabButton>
            </div>
        </div>
      
      <div
        className="
          max-w-none 
          [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-fuchsia-400 [&_h2]:mt-8 [&_h2]:mb-4 
          [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-violet-400 [&_h3]:mt-6 [&_h3]:mb-3 
          [&_p]:text-indigo-200 [&_p]:leading-relaxed [&_p]:mb-4
          [&_a]:text-fuchsia-400 [&_a]:font-semibold hover:[&_a]:underline 
          [&_b]:text-indigo-50"
        dangerouslySetInnerHTML={{ __html: getArticleContent() }}
      />
    </div>
  );
};

export default ArticleDisplay;