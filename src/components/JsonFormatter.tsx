import React, { useState, useCallback } from 'react';

const JsonFormatter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = useCallback(() => {
    if (!jsonInput.trim()) {
      setError('Por favor, insira um JSON.');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      const formattedJson = JSON.stringify(parsedJson, null, 2);

      const newWindow = window.open('', '_blank', 'width=800,height=600');

      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>JSON Formatado</title>
              <style>
                body { background-color: #0f172a; color: #e2e8f0; font-family: monospace; padding: 1rem; }
                pre { white-space: pre-wrap; word-wrap: break-word; }
              </style>
            </head>
            <body><pre><code>${formattedJson.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></body>
          </html>
        `);
        newWindow.document.close();
      }
      setError('');
    } catch (e) {
      setError(e instanceof Error ? `JSON inválido: ${e.message}` : 'Ocorreu um erro desconhecido.');
    }
  }, [jsonInput]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">Formatar JSON</h2>
      <div className="flex flex-col space-y-3">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Cole seu JSON aqui"
          className="flex-grow bg-slate-700 text-slate-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-40 resize-y"
          aria-label="JSON input"
        />
        <button
          onClick={handleFormat}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Formatar e Abrir em Nova Janela
        </button>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default JsonFormatter;
