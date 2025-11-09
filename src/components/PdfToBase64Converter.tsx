import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

const PdfToBase64Converter: React.FC = () => {
  const [base64String, setBase64String] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setBase64String('');
      setFileName('');
      setError('');
      return;
    }
    
    if (file.type !== 'application/pdf') {
        setError('Please select a PDF file.');
        setBase64String('');
        setFileName('');
        return;
    }

    setError('');
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBase64String(reader.result);
      }
    };
    reader.onerror = () => {
      setError('Error reading file.');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleCopy = useCallback(() => {
    if (!base64String) return;
    navigator.clipboard.writeText(base64String);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [base64String]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">PDF to Base64</h2>
      <div className="flex flex-col space-y-3">
        <label htmlFor="pdf-upload" className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-md cursor-pointer text-center transition-colors">
          {fileName || 'Select a PDF'}
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {base64String && (
          <div className="relative bg-slate-700 rounded-md p-3">
            <textarea
              readOnly
              value={base64String}
              className="font-mono text-sm text-slate-200 select-all w-full bg-transparent border-none resize-none h-32 focus:outline-none"
              aria-label="Base64 output"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Copy Base64 string"
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfToBase64Converter;