const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CREDENTIALS_PATH = path.join(__dirname, "../../config/credentials.json");
const TOKEN_PATH = path.join(__dirname, "../../config/token.json");
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

  module.exports = {authenticate};