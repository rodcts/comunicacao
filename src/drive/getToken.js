const fs = require("fs");
const readline = require("readline");
const path = require("path");

const TOKEN_PATH = path.join(__dirname, "../../config/token.json");
const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.file",
];

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

module.exports = { getAccessToken };
