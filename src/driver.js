const { google } = require("googleapis");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

// TODO adicionar as credenciais como variavel de ambiente para respeitar as regras de segurança
// Caminho para as credenciais do Google
const CREDENTIALS_PATH = path.join(__dirname, "../config/credentials.json");
const TOKEN_PATH = path.join(__dirname, "../config/token.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

/**
 * Função para autenticar e obter o cliente da API do Google
 * @return {*}
 */
async function authenticate() {
  const { client_secret, client_id, redirect_uris } = require(CREDENTIALS_PATH).installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
  } catch (err) {
    await getAccessToken(oAuth2Client);
  }
  console.log(`✅ Autenticado com sucesso em `);
  return oAuth2Client;
}

/**
 * Função para obter o token de acesso
 * @param {*} oAuth2Client
 * @return {*}
 */
function getAccessToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    console.log("Autorize esse app para acessar a url: ", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Adicione o codigo da URL aqui: ", async (code) => {
      rl.close();
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log(`✅ Token gerado com sucesso em `);
        resolve();
      } catch (err) {
        reject("Error token acesso");
      }
    });
  });
}

/**
 * Função para listar e baixar o arquivo CSV do Google Drive
 * @param {*} auth
 * @return {*}
 */
async function downloadCSVFile(auth) {
  const drive = google.drive({ version: "v3", auth });

  // TODO esse feature deverá ter a capacidade de pegar somente um periodo especifico.
  const res = await drive.files.list({
    q: "mimeType='application/vnd.ms-excel' or mimeType='text/csv' or name contains 'voluntario'",
    fields: "files(id, name, mimeType)",
  });
  const { files } = res.data;
  console.log(`Foram encontrados ${files.length} arquivos com o nome buscado`);

  // Trata se nao encontrar nada no Drive
  if (!files || files.length == 0) {
    throw new Error("Nada encontrado no Google Drive");
  }

  const file = res.data.files.find((file) => file.name == "voluntarios.csv");
  // Se o arquivo existir segue o processo
  if (file) {
    const fileId = file.id;
    fs.createWriteStream(path.join(__dirname, "../uploads", file.name));

    await drive.files.export({
      fileId,
      mimeType: "text/csv",
    });

    console.log(`Arquivo ${file.name} baixado com sucesso!`);
    return path.join(__dirname, "../uploads", file.name);
  } else {
    throw new Error("Arquivo CSV não encontrado no Google Drive");
  }
}

module.exports = {
  authenticate,
  downloadCSVFile,
};
