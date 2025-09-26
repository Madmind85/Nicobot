import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75 transition-all duration-300 disabled:bg-indigo-700 disabled:text-indigo-400 disabled:cursor-not-allowed transform hover:scale-105"
    >
      {children}
    </button>
  );
};

export default Button;