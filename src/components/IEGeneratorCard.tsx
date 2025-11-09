import React, { useState, useEffect, useCallback } from 'react';
import { CopyIcon, CheckIcon, RefreshIcon } from './Icons';
import { generateIE, formatIE, brazilianStates, BrazilianState } from '../services/brazilianDocuments';

const IEGeneratorCard: React.FC = () => {
  const [selectedState, setSelectedState] = useState<BrazilianState>('SP');
  const [generatedValue, setGeneratedValue] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isFormatted, setIsFormatted] = useState(true);

  const handleGenerate = useCallback(() => {
    setGeneratedValue(generateIE(selectedState));
  }, [selectedState]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleCopy = useCallback(() => {
    if (!generatedValue) return;
    const valueToCopy = isFormatted ? formatIE(generatedValue, selectedState) : generatedValue;
    navigator.clipboard.writeText(valueToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [generatedValue, isFormatted, selectedState]);

  const displayValue = generatedValue ? (isFormatted ? formatIE(generatedValue, selectedState) : generatedValue) : '...';

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-cyan-400">Inscrição Estadual (IE)</h2>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value as BrazilianState)}
          className="bg-slate-700 text-slate-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
        >
          {brazilianStates.map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between bg-slate-700 rounded-md p-3">
        <span className="font-mono text-lg text-slate-200 select-all w-full break-all">{displayValue}</span>
        <div className="flex items-center space-x-2 pl-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Copy Inscrição Estadual"
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <button
            onClick={handleGenerate}
            className="p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Generate new Inscrição Estadual"
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <input
          type="checkbox"
          id="format-ie"
          checked={isFormatted}
          onChange={() => setIsFormatted(!isFormatted)}
          className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 bg-slate-600"
        />
        <label htmlFor="format-ie" className="ml-2 block text-sm text-slate-300">
          Show formatted
        </label>
      </div>
    </div>
  );
};

export default IEGeneratorCard;
