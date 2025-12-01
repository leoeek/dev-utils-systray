import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface Address {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  erro?: boolean;
}

const CepFinder: React.FC = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) {
      setError('CEP inválido. Deve conter 8 dígitos.');
      setAddress(null);
      return;
    }

    setError('');
    setAddress(null);
    setIsLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data: Address = await response.json();

      if (data.erro) {
        setError('CEP não encontrado.');
        setAddress(null);
      } else {
        setAddress(data);
      }
    } catch (e) {
      setError('Falha ao buscar o CEP. Verifique sua conexão.');
      setAddress(null);
    } finally {
      setIsLoading(false);
    }
  }, [cep]);

  const handleCopy = useCallback(() => {
    if (!address) return;
    const addressString = `${address.logradouro}, ${address.bairro}, ${address.localidade} - ${address.uf}, ${address.cep}`;
    navigator.clipboard.writeText(addressString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [address]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">Buscar Endereço por CEP</h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
          className="flex-grow bg-slate-700 text-slate-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {address && (
        <div className="mt-4 bg-slate-700 rounded-md p-3 relative">
          <div className="font-mono text-sm text-slate-200 space-y-1">
            <p><strong>Logradouro:</strong> {address.logradouro}</p>
            <p><strong>Bairro:</strong> {address.bairro}</p>
            <p><strong>Cidade:</strong> {address.localidade}</p>
            <p><strong>Estado:</strong> {address.uf}</p>
            <p><strong>CEP:</strong> {address.cep}</p>
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Copiar Endereço"
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      )}
    </div>
  );
};

export default CepFinder;
