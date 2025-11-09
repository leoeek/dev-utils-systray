import React, { useState, useEffect, useCallback } from 'react';
import { CopyIcon, CheckIcon, RefreshIcon } from './Icons';

interface GeneratorCardProps {
  title: string;
  generateFunction: () => string;
  formatFunction: (value: string) => string;
}

const GeneratorCard: React.FC<GeneratorCardProps> = ({
  title,
  generateFunction,
  formatFunction,
}) => {
  const [generatedValue, setGeneratedValue] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isFormatted, setIsFormatted] = useState(true);

  const handleGenerate = useCallback(() => {
    setGeneratedValue(generateFunction());
  }, [generateFunction]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleCopy = useCallback(() => {
    if (!generatedValue) return;
    const valueToCopy = isFormatted ? formatFunction(generatedValue) : generatedValue;
    navigator.clipboard.writeText(valueToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [generatedValue, isFormatted, formatFunction]);

  const displayValue = generatedValue ? (isFormatted ? formatFunction(generatedValue) : generatedValue) : '...';

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">{title}</h2>
      <div className="flex items-center justify-between bg-slate-700 rounded-md p-3">
        <span className="font-mono text-lg text-slate-200 select-all w-full break-all">{displayValue}</span>
        <div className="flex items-center space-x-2 pl-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label={`Copy ${title}`}
            >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <button
            onClick={handleGenerate}
            className="p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label={`Generate new ${title}`}
            >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <input
            type="checkbox"
            id={`format-${title.toLowerCase()}`}
            checked={isFormatted}
            onChange={() => setIsFormatted(!isFormatted)}
            className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 bg-slate-600"
        />
        <label htmlFor={`format-${title.toLowerCase()}`} className="ml-2 block text-sm text-slate-300">
            Show formatted
        </label>
      </div>
    </div>
  );
};

export default GeneratorCard;
