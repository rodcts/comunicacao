# Automação de Escala de Voluntários

Este projeto visa automatizar a geração e envio da escala de voluntários para uma equipe de comunicação de uma igreja, com funcionalidades para:

- Leitura de arquivos CSV com os dados dos voluntários.
- Geração de um arquivo PDF com a escala.
- Envio da escala por e-mail.
- Envio da escala via WhatsApp utilizando a API do Twilio.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript.
- **csv-parser**: Para ler os dados do arquivo CSV.
- **pdfkit**: Para gerar arquivos PDF da escala.
- **nodemailer**: Para envio de e-mails com a escala em anexo.
- **Twilio API**: Para envio da escala via WhatsApp.

## Instalação

### Pré-requisitos

- **Node.js** instalado. Caso não tenha, baixe e instale [aqui](https://nodejs.org/).
- **Twilio Account**: Crie uma conta em [Twilio](https://www.twilio.com/), obtenha o SID da conta, o Auth Token e configure o número de WhatsApp.

### Passos para instalação:

1. Clone este repositório ou faça o download do código.
2. No diretório do projeto, instale as dependências:

   ```bash
   npm install csv-parser nodemailer pdfkit twilio




/automacao-escala
│
├── /config/                  # Arquivos de configuração (como credenciais do Google API, Twilio, etc.)
│   ├── credentials.json       # Arquivo de credenciais do Google API
│   ├── config.js              # Configurações gerais (ex: SID do Twilio, e-mail, etc.)
│   └── token.json             # Token de autenticação do Google (gerado após a primeira execução)
│
├── /src/                      # Código-fonte da automação
│   ├── index.js               # Código principal para rodar a automação
│   ├── drive.js               # Funções para autenticação e download do arquivo CSV do Google Drive
│   ├── email.js               # Funções para enviar e-mails
│   ├── whatsapp.js            # Funções para enviar mensagens via WhatsApp (Twilio)
│   ├── pdfGenerator.js        # Funções para gerar o PDF com a escala
│   └── csvProcessor.js        # Funções para processar o arquivo CSV
│
├── /uploads/                  # Pasta onde os arquivos CSV ou PDFs podem ser temporariamente armazenados
│   └── escala_voluntarios.csv # Exemplo de arquivo CSV baixado ou carregado
│
├── /logs/                     # Pasta para armazenar logs do projeto (caso você queira salvar logs de execução)
│   └── app.log                # Log da execução da automação
│
├── /node_modules/             # Dependências do Node.js (gerado automaticamente)
│
├── package.json               # Arquivo de configuração do Node.js, com dependências e scripts
├── package-lock.json          # Lockfile das dependências (gerado automaticamente)
└── README.md                  # Documentação do projeto
