import React from 'react';

const logoUrl = "https://chemevedo.altervista.org/Pinguetta.png";

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center bg-indigo-900/50 p-2 rounded-full border border-violet-500/30 mb-4 shadow-lg">
        <img src={logoUrl} alt="NICOBOT Logo" className="w-20 h-20 rounded-full object-cover" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
        NICOBOT
      </h1>
      <p className="mt-3 text-lg text-indigo-300 max-w-2xl mx-auto">
        Inserisci il titolo di un gioco per generare un post per il blog completo e ottimizzato in pochi secondi.
      </p>
    </header>
  );
};

export default Header;