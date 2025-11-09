const randomDigit = (): number => Math.floor(Math.random() * 10);
const randomDigits = (length: number): number[] => Array.from({ length }, randomDigit);

const mod11 = (digits: number[], weights: number[]): number => {
    const sum = digits.reduce((acc, digit, i) => acc + digit * weights[i], 0);
    const remainder = sum % 11;
    const verifier = 11 - remainder;
    return (verifier === 10 || verifier === 11) ? 0 : verifier;
}

// --- CPF ---
const calculateCpfVerifier = (digits: number[]): number => {
  const sum = digits.reduce((acc, digit, index) => acc + digit * (digits.length + 1 - index), 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};

export const generateCpf = (): string => {
  const base = randomDigits(9);
  const d1 = calculateCpfVerifier(base);
  const d2 = calculateCpfVerifier([...base, d1]);
  return [...base, d1, d2].join('');
};

export const formatCpf = (cpf: string): string => {
  if (!cpf || cpf.length !== 11) return cpf;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// --- CNPJ ---
const calculateCnpjVerifier = (digits: number[]): number => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const initialIndex = digits.length === 12 ? 1 : 0;
    const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index + initialIndex], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
};

export const generateCnpj = (): string => {
    const base = randomDigits(8);
    const branch = [0, 0, 0, 1]; 
    const fullBase = [...base, ...branch];
    const d1 = calculateCnpjVerifier(fullBase);
    const d2 = calculateCnpjVerifier([...fullBase, d1]);
    return [...fullBase, d1, d2].join('');
};

export const formatCnpj = (cnpj: string): string => {
    if (!cnpj || cnpj.length !== 14) return cnpj;
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

// --- RG ---
export const generateRg = (): string => randomDigits(9).join('');
export const formatRg = (rg: string): string => {
    if (!rg || rg.length !== 9) return rg;
    return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
}

// --- RENAVAM ---
export const generateRenavam = (): string => {
  const base = randomDigits(10);
  const reversedBase = base.slice().reverse();
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3];
  const sum = reversedBase.reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const remainder = sum % 11;
  const verifier = (remainder < 2) ? 0 : (11 - remainder);
  return [...base, verifier].join('');
};

export const formatRenavam = (renavam: string): string => {
  if (!renavam || renavam.length !== 11) return renavam;
  return renavam.replace(/(\d{4})(\d{6})(\d{1})/, '$1.$2-$3');
};

// --- PIS/PASEP ---
export const generatePisPasep = (): string => {
    const base = randomDigits(10);
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const verifier = mod11(base, weights);
    return [...base, verifier].join('');
};
export const formatPisPasep = (pis: string): string => {
    if (!pis || pis.length !== 11) return pis;
    return pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
};


// --- IE
export const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;
export type BrazilianState = typeof brazilianStates[number];

const ieRules: Record<BrazilianState, { weights: number[], digits: number }> = {
    AC: { weights: [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], digits: 11 },
    AL: { weights: [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], digits: 8 }, 
    AP: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    AM: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    BA: { weights: [7, 6, 5, 4, 3, 2], digits: 7 }, 
    CE: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    DF: { weights: [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], digits: 11 },
    ES: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    GO: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    MA: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    MT: { weights: [3, 2, 9, 8, 7, 6, 5, 4, 3, 2], digits: 10 },
    MS: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    MG: { weights: [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1], digits: 8 },
    PA: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    PB: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    PR: { weights: [4, 3, 2, 7, 6, 5, 4, 3, 2], digits: 8 }, 
    PE: { weights: [8, 7, 6, 5, 4, 3, 2], digits: 7 }, 
    PI: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    RJ: { weights: [2, 7, 6, 5, 4, 3, 2], digits: 7 },
    RN: { weights: [10, 9, 8, 7, 6, 5, 4, 3, 2], digits: 8 }, 
    RS: { weights: [2, 9, 8, 7, 6, 5, 4, 3, 2], digits: 9 },
    RO: { weights: [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], digits: 8 }, 
    RR: { weights: [1, 2, 3, 4, 5, 6, 7, 8], digits: 8 },
    SC: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    SP: { weights: [1, 3, 4, 5, 6, 7, 8, 10], digits: 8 }, 
    SE: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 },
    TO: { weights: [9, 8, 7, 6, 5, 4, 3, 2], digits: 8 }, 
};

export const generateIE = (uf: BrazilianState): string => {
    const rule = ieRules[uf];
    const base = randomDigits(rule.digits);
    
    const prefixes: Partial<Record<BrazilianState, number[]>> = {
        AC: [0, 1], GO: [1, 0], MS: [2, 8], PA: [1, 5],
        RN: [2, 0], RO: [1,0,0], TO: [2,9] 
    };
    if (prefixes[uf]) {
        prefixes[uf]!.forEach((digit, i) => base[i] = digit);
    }
    
    let fullBase = [...base];
    switch(uf) {
        case 'BA': {
            const weights1 = [8, 7, 6, 5, 4, 3, 2];
            const d2 = mod11(fullBase, weights1);
            const weights2 = [9, 8, 7, 6, 5, 4, 3, 2];
            const d1 = mod11([...fullBase, d2], weights2);
            return [...fullBase, d1, d2].join('');
        }
        case 'MG': {
            const mgBase = [ ...base.slice(0, 3), 0, ...base.slice(3)];
            let sum = 0;
            mgBase.forEach((digit, i) => {
                const product = digit * rule.weights[i+1];
                sum += Math.floor(product / 10) + (product % 10);
            });
            const d1 = (Math.ceil(sum / 10) * 10) - sum;
            const weights2 = [3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            const d2 = mod11([...mgBase, d1], weights2);
            return [...mgBase, d1, d2].join('');
        }
        case 'SP': {
            const d1Weights = [1, 3, 4, 5, 6, 7, 8, 10];
            const sum1 = base.reduce((acc, digit, i) => acc + digit * d1Weights[i], 0);
            const d1 = sum1 % 11 % 10;
            const spBase = [...base, d1, ...randomDigits(2)];
            const d2Weights = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            const sum2 = spBase.reduce((acc, digit, i) => acc + digit * d2Weights[i], 0);
            const d2 = sum2 % 11 % 10;
            return [ ...spBase, d2 ].join('');
        }
        default: {
            const verifier = mod11(base, rule.weights);
            return [...base, verifier].join('');
        }
    }
};

export const formatIE = (ie: string, uf: BrazilianState): string => {
  if (!ie) return ie;
  switch (uf) {
    case 'AC': return ie.replace(/(\d{2})(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3/$4-$5');
    case 'AL': return ie.replace(/(\d{9})/, '$1');
    case 'AP': return ie.replace(/(\d{2})(\d{6})(\d{1})/, '$1.$2-$3');
    case 'AM': return ie.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    case 'BA': return ie.replace(/(\d{6})(\d{2})/, '$1-$2');
    case 'CE': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'DF': return ie.replace(/(\d{11})(\d{2})/, '$1-$2');
    case 'ES': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'GO': return ie.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    case 'MA': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'MT': return ie.replace(/(\d{10})(\d{1})/, '$1-$2');
    case 'MS': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'MG': return ie.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
    case 'PA': return ie.replace(/(\d{2})(\d{6})(\d{1})/, '$1-$2');
    case 'PB': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'PR': return ie.replace(/(\d{6})(\d{2})/, '$1-$2');
    case 'PE': return ie.replace(/(\d{7})(\d{2})/, '$1-$2');
    case 'PI': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'RJ': return ie.replace(/(\d{2})(\d{3})(\d{2})(\d{1})/, '$1.$2.$3-$4');
    case 'RN': return ie.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    case 'RS': return ie.replace(/(\d{3})(\d{7})/, '$1/$2');
    case 'RO': return ie.replace(/(\d{3})(\d{5})(\d{1})/, '$1.$2-$3');
    case 'RR': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'SC': return ie.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    case 'SP': return ie.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4');
    case 'SE': return ie.replace(/(\d{8})(\d{1})/, '$1-$2');
    case 'TO': return ie.replace(/(\d{11})/, '$1');
    default: return ie;
  }
};
