import React, { useState, useCallback } from 'react';

const Base64ToImageConverter: React.FC = () => {
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');

  const handleShowImage = useCallback(() => {
    if (!base64String.trim()) {
      setError('Por favor, insira uma string Base64.');
      return;
    }

    if (!base64String.startsWith('data:image/')) {
        setError('A string Base64 não parece ser de uma imagem válida.');
        return;
    }

    setError('');

    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Imagem a partir de Base64</title>
            <style>
              body { margin: 0; background-color: #0f172a; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; }
            </style>
          </head>
          <body>
            <img src="${base64String}" alt="Imagem convertida de Base64" />
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  }, [base64String]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">Base64 para Imagem</h2>
      <div className="flex flex-col space-y-3">
        <textarea
          value={base64String}
          onChange={(e) => setBase64String(e.target.value)}
          placeholder="Cole a string Base64 da imagem aqui..."
          className="font-mono text-sm text-slate-200 w-full bg-slate-700 border border-slate-600 rounded-md p-3 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Base64 input"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button onClick={handleShowImage} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer text-center transition-colors">
          Ver Imagem
        </button>
      </div>
    </div>
  );
};

export default Base64ToImageConverter;
