import React, { useState, useCallback, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
const LOREM_PARAGRAPH = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LoremIpsumGenerator: React.FC = () => {
  const [generateType, setGenerateType] = useState<'paragraphs' | 'words'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    let text = '';
    if (generateType === 'paragraphs') {
      text = Array(count).fill(LOREM_PARAGRAPH).join('\n\n');
    } else {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
      }
      text = words.join(' ');
    }
    setGeneratedText(text);
  }, [count, generateType]);

  const handleCopy = useCallback(() => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [generatedText]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">Gerador de Lorem Ipsum</h2>
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-2">
          <label className="text-slate-300">Tipo:</label>
          <select
            value={generateType}
            onChange={(e) => setGenerateType(e.target.value as 'paragraphs' | 'words')}
            className="bg-slate-700 text-slate-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="paragraphs">Parágrafos</option>
            <option value="words">Palavras</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="lorem-count" className="text-slate-300">
            Quantidade:
          </label>
          <input
            id="lorem-count"
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
            min="1"
            className="w-20 bg-slate-700 text-slate-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>
      <button
        onClick={handleGenerate}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-colors mb-3"
      >
        Gerar
      </button>

      {generatedText && (
        <div className="relative bg-slate-700 rounded-md p-3">
          <textarea
            readOnly
            value={generatedText}
            className="font-sans text-sm text-slate-200 select-all w-full bg-transparent border-none resize-y h-40 focus:outline-none"
            aria-label="Lorem Ipsum output"
          />
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Copiar Lorem Ipsum"
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoremIpsumGenerator;
