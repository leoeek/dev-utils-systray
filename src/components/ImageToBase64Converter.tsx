import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

const ImageToBase64Converter: React.FC = () => {
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
    
    if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione a imagem.');
        setBase64String('');
        setFileName('');
        return;
    }

    setError('');
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const result = reader.result;
        setBase64String(result);

        const newWindow = window.open('', '_blank', 'width=800,height=600');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>Base64 - ${file.name}</title>
                <style>
                  body { background-color: #0f172a; color: #e2e8f0; font-family: monospace; padding: 1rem; }
                  textarea { width: 100%; height: 90vh; background-color: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 0.375rem; padding: 0.5rem; box-sizing: border-box; }
                  button { background-color: #0891b2; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; margin-bottom: 1rem; }
                  button:hover { background-color: #0e7490; }
                </style>
              </head>
              <body>
                <button onclick="navigator.clipboard.writeText(document.getElementById('base64-content').value); this.innerText = 'Copiado!'; setTimeout(() => this.innerText = 'Copiar Base64', 2000);">Copiar Base64</button>
                <textarea id="base64-content" readonly>${result}</textarea>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      }
    };
    reader.onerror = () => {
      setError('Error reading file.');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }, []);

  // const handleCopy = useCallback(() => {
  //   if (!base64String) return;
  //   navigator.clipboard.writeText(base64String);
  //   setIsCopied(true);
  //   setTimeout(() => setIsCopied(false), 2000);
  // }, [base64String]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">Image para Base64</h2>
      <div className="flex flex-col space-y-3">
        <label htmlFor="image-upload" className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-md cursor-pointer text-center transition-colors">
          Selecione a imagem
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {/* {base64String && (
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
        )} */}
      </div>
    </div>
  );
};

export default ImageToBase64Converter;
