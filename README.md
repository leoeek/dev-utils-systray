# 🚀 Gerador Dev (Dev Utils Systray)

Uma aplicação de bandeja de sistema (systray) para desktop, construída com Electron e React, que oferece um conjunto de ferramentas e utilitários para facilitar o dia a dia de desenvolvedores.

---

## ✨ Funcionalidades

O Gerador Dev oferece uma variedade de ferramentas acessíveis diretamente da sua área de trabalho:

* Consulta de CEP: Busca rápida de endereços a partir de um CEP, utilizando a API do ViaCEP.
* Geradores de Documentos:
    * CPF (com e sem máscara)
    * CNPJ (com e sem máscara)
    * RG
    * RENAVAM
    * PIS/PASEP
    * Inscrição Estadual (IE) para diversos estados.    
* Conversores de Base64:
    * Converta arquivos de Imagem para uma string Base64.
    * Converta arquivos PDF para uma string Base64.
    * Visualize uma Imagem a partir de uma string Base64.
* Utilitários de Texto:
    * Formatador de JSON: Valide e formate strings JSON, abrindo o resultado em uma nova janela.
    * Gerador de Lorem Ipsum: Crie parágrafos de texto de preenchimento rapidamente.
* Integração com o Sistema:
    * A aplicação roda em segundo plano e pode ser acessada através de um ícone na bandeja do sistema (systray).
    * Feche a janela e a aplicação continuará rodando, pronta para ser reaberta com um clique.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com tecnologias modernas para garantir uma experiência de desenvolvimento e de uso fluida e eficiente.

* **Electron**: Para criar a aplicação desktop multiplataforma com tecnologias web.
* **React**: Para a construção da interface de usuário reativa e componentizada.
* **Vite**: Como ferramenta de build e servidor de desenvolvimento de alta performance.
* **TypeScript**: Para adicionar tipagem estática ao JavaScript, tornando o código mais robusto e legível.
* **Tailwind CSS**: Para a estilização da interface de forma utilitária e moderna.
* **Electron Builder**: Para empacotar e distribuir a aplicação para Linux, Windows e macOS.

---

## 🚀 Instalação e Uso

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

Pré-requisitos:
* **Node.js** (versão 18 ou superior)
* **NPM ou Yarn**

Passos:

### 1. Clone o repositório:

```bash
git clone https://github.com/leoeek/dev-utils-systray.git
```

### 2. Navegue até o diretório do projeto:

Crie o arquivo de ambiente e gere a chave da aplicação:

```bash
cd dev-utils-systray
```

### 3. Instale as dependências:

```bash
npm install
```

### 4. Execute a aplicação em modo de desenvolvimento:

```bash
npm start
```
Este comando iniciará o servidor do Vite e a aplicação Electron simultaneamente, com hot-reload ativado.


## 📦 Empacotando para Produção

Para gerar os arquivos de instalação para a sua plataforma (Linux, Windows ou macOS), execute o seguinte comando:

```bash
npm run dist
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.