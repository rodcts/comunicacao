const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

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

module.exports = { downloadCSVFile };
