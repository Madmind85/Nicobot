import React, { useState, useCallback } from 'react';
import { AppState, GeneratedContent } from './types';
import { generateBlogPost } from './services/geminiService';
import Header from './components/Header';
import GameInputForm from './components/GameInputForm';
import ArticleDisplay from './components/ArticleDisplay';
import SeoDisplay from './components/SeoDisplay';
import Loader from './components/Loader';
import Button from './components/Button';
import { ResetIcon } from './components/icons';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.Initial);
  const [topic, setTopic] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<'IT' | 'EN'>('IT');

  const handleGenerate = useCallback(async (title: string, type: 'game' | 'event') => {
    if (!title) {
      setError('Per favore, inserisci un argomento valido.');
      setAppState(AppState.Error);
      return;
    }

    try {
      setTopic(title);
      setError(null);
      setAppState(AppState.Generating);
      const result = await generateBlogPost(title, type);
      setGeneratedContent(result);
      setAppState(AppState.Generated);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Si è verificato un errore sconosciuto.";
      setError(errorMessage);
      setAppState(AppState.Error);
      console.error(err);
    }
  }, []);

  const handleReset = () => {
    setAppState(AppState.Initial);
    setTopic('');
    setGeneratedContent(null);
    setError(null);
    setActiveLanguage('IT');
  };

  const isLoading = appState === AppState.Generating;

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-indigo-900/60 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-violet-700/50 transition-all duration-300">
            {appState === AppState.Initial && (
              <GameInputForm onGenerate={handleGenerate} disabled={isLoading} />
            )}

            {appState === AppState.Generating && (
              <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px]">
                <Loader />
                <p className="text-lg text-fuchsia-400 animate-pulse">
                  Scrivendo l'articolo per "{topic}"...
                </p>
                <p className="text-sm text-indigo-300">Potrebbe volerci un momento.</p>
              </div>
            )}

            {appState === AppState.Error && (
                <div className="flex flex-col items-center text-center p-4">
                    <p className="text-red-400 font-semibold mb-4">{error}</p>
                    <Button onClick={handleReset}>Riprova</Button>
                </div>
            )}

            {appState === AppState.Generated && generatedContent && (
              <div className="space-y-8 animate-fade-in">
                <ArticleDisplay
                  italianArticle={generatedContent.italianArticle}
                  englishArticle={generatedContent.englishArticle}
                  activeLanguage={activeLanguage}
                  onLanguageChange={setActiveLanguage}
                />
                <SeoDisplay 
                  titles={generatedContent.seoTitles}
                  keywords={activeLanguage === 'IT' ? generatedContent.italianSeoKeywords : generatedContent.englishSeoKeywords}
                />
              </div>
            )}
          </div>
          {appState > AppState.Initial && appState !== AppState.Generating && (
            <div className="mt-6 text-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-fuchsia-400 transition-colors duration-200"
              >
                <ResetIcon />
                Ricomincia
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;