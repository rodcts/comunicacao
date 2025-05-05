const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { dia, mes, ano } = require("../date.js");
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
  console.log(`✅ Foram encontrados ${files.length} arquivos com o nome buscado`);

  // Trata se nao encontrar nada no Drive
  if (!files || files.length == 0) {
    throw new Error("Nada encontrado no Google Drive");
  }

  // Verifica se o arquivo existe no Drive
  const file = files.find((file) => file.name == `voluntarios_${mes()}${ano()}.csv`);
  // Se o arquivo existir segue o processo
  if (file) {
    console.log(`✅ Foi encontrado o arquivo ${file.name} buscado`);

    const fileId = file.id;
    // faz download do arquivo    
    const destPath = fs.createWriteStream(path.join(__dirname, "../uploads", file.name));

    const res = await drive.files.export({
      fileId,
      mimeType: "text/csv",
    },{ responseType: "stream" });

    await new Promise((resolve, reject) => {
      res.data
        .on("end", () => {
          console.log(`✅ Arquivo salvo em: ${destPath}`);
          resolve();
        })
        .on("error", (err) => {
          console.error("Erro ao salvar o arquivo:", err);
          reject(err);
        })
        .pipe(destPath);
    });

    return path.join(__dirname, "../uploads", file.name);
  } else {
    throw new Error("Arquivo CSV não encontrado no Google Drive");
  }
}

module.exports = { downloadCSVFile };
