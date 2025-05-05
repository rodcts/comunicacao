const { google } = require("googleapis");
const path = require("path");

/**
 * Caminho para o arquivo da conta de serviço (gerado no Console do Google Cloud)
 */
const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../../config/service-account.json");

/**
 * Função para autenticar com conta de serviço
 * @return {google.auth.JWT} Cliente autenticado
 */
async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_PATH,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // ou outros escopos que precisar
  });

  const authClient = await auth.getClient();
  console.log("✅ Autenticado com conta de serviço com sucesso.");
  return authClient;
}

module.exports = { authenticate };
