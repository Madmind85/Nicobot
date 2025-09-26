
import React from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, disabled }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-600 rounded-lg text-center cursor-pointer hover:border-cyan-500 hover:bg-slate-700/50 transition-colors duration-300">
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center">
          <UploadIcon />
          <p className="mt-4 text-xl font-semibold text-slate-200">
            Click to upload or drag & drop
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Choose a PDF document
          </p>
        </div>
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        accept=".pdf"
        onChange={onFileChange}
        disabled={disabled}
      />
    </div>
  );
};

export default FileUpload;
