import React from 'react';
import GeneratorCard from './components/GeneratorCard';
import IEGeneratorCard from './components/IEGeneratorCard';
import ImageToBase64Converter from './components/ImageToBase64Converter';
import PdfToBase64Converter from './components/PdfToBase64Converter';
import CepFinder from './components/CepFinder';
import JsonFormatter from './components/JsonFormatter';
import Base64ToImageConverter from './components/Base64ToImageConverter';
import LoremIpsumGenerator from './components/LoremIpsumGenerator';
import { GithubIcon } from './components/Icons';
import {
  generateCpf, formatCpf,
  generateCnpj, formatCnpj,
  generateRg, formatRg,
  generateRenavam, formatRenavam,
  generatePisPasep, formatPisPasep,
} from './services/brazilianDocuments';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 font-sans">
      <div className="container mx-auto max-w-lg">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-cyan-400">Gerador Dev</h1>
          <p className="text-slate-400 mt-2">Gerador de documentos e outros utilitários para desenvolvedores.</p>
        </header>

        <main className="space-y-4">
          <CepFinder />
          <GeneratorCard title="CPF" generateFunction={generateCpf} formatFunction={formatCpf} />
          <GeneratorCard title="CNPJ" generateFunction={generateCnpj} formatFunction={formatCnpj} />
          <IEGeneratorCard />
          <GeneratorCard title="RG" generateFunction={generateRg} formatFunction={formatRg} />
          <GeneratorCard title="RENAVAM" generateFunction={generateRenavam} formatFunction={formatRenavam} />
          <GeneratorCard title="PIS/PASEP" generateFunction={generatePisPasep} formatFunction={formatPisPasep} />
          <LoremIpsumGenerator />
          <JsonFormatter />
          <ImageToBase64Converter />
          <Base64ToImageConverter />
          <PdfToBase64Converter />
        </main>

        <footer className="text-center mt-8 text-slate-500">
          <p>De dev para devs.</p>
          <a
            href="https://github.com/leoeek/dev-utils-systray"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 hover:text-cyan-400 transition-colors mt-2"
          >
            <GithubIcon />
            <span>Ver no GitHub</span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;