const fs = require('fs');
const csv = require('csv-parser');

function processarCSV(caminhoArquivo) {
    const dados = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(caminhoArquivo)
            .pipe(csv())
            .on('data', (row) => dados.push(row))
            .on('end', () => resolve(dados))
            .on('error', (err) => reject(err));
    });
}

module.exports = {
    processarCSV
};
