import React, { useState } from 'react';
import Button from './Button';

type TopicType = 'game' | 'event';

interface GameInputFormProps {
  onGenerate: (title: string, type: TopicType) => void;
  disabled: boolean;
}

const GameInputForm: React.FC<GameInputFormProps> = ({ onGenerate, disabled }) => {
  const [title, setTitle] = useState('');
  const [activeTab, setActiveTab] = useState<TopicType>('game');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onGenerate(title, activeTab);
  };

  const TabButton: React.FC<{ type: TopicType; children: React.ReactNode }> = ({ type, children }) => (
    <button
      type="button"
      onClick={() => {
        setActiveTab(type);
        setTitle(''); // Pulisce l'input quando si cambia scheda
      }}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors w-full ${
        activeTab === type
          ? 'bg-violet-600 text-white'
          : 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2 p-1 bg-indigo-900 rounded-lg max-w-sm mx-auto">
        <TabButton type="game">Videogioco</TabButton>
        <TabButton type="event">Tema / Evento</TabButton>
      </div>

      <div className="pt-2">
        <label htmlFor="content-title" className="block text-lg font-medium text-indigo-200 mb-2 text-center">
          {activeTab === 'game' ? 'Inserisci il titolo del videogioco' : 'Inserisci il tema o l\'evento'}
        </label>
        <input
          id="content-title"
          name="content-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full px-4 py-3 bg-indigo-800/50 border border-violet-700 rounded-lg placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
          placeholder={activeTab === 'game' ? "Es: Elden Ring, Baldur's Gate 3..." : "Es: E3 2024, I migliori Soulslike..."}
          disabled={disabled}
          required
        />
      </div>
      <div className="text-center pt-2">
        <Button type="submit" disabled={disabled || !title}>
          Genera Articolo
        </Button>
      </div>
    </form>
  );
};

export default GameInputForm;