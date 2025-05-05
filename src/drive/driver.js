const { authenticate } = require("./auth");
const { getAccessToken } = require("./getToken");
const { downloadCSVFile } = require("./download");

const requestAPI = async () => {
  // TODO add as funçoes
  console.log("Autenticando...");
  const oAuth = await authenticate();
  console.log("✅ Autenticado...");

  console.log("Gerando token de acesso...");
  const accessToken = await getAccessToken(oAuth);
  console.log("✅ Token gerado com sucesso!");

  console.log("Baixando arquivo CSV...");
  const csvFile = await downloadCSVFile(oAuth);
  console.log("✅ Baixado arquivo CSV...");

  try {
    const results = await Promise.all([authenticate(), getAccessToken(), downloadCSVFile()]);
    console.log("Resultados:", results);
  } catch (err) {
    console.error("Erro:", err);
  }
};

requestAPI();

module.exports = {
  authenticate,
  downloadCSVFile,
};
