const PDFDocument = require('pdfkit');
const fs = require('fs');

function gerarPDF(dadosEscala, caminhoArquivo) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(caminhoArquivo));

    doc.fontSize(16).text('Escala de Voluntários', { align: 'center' });
    doc.moveDown();

    dadosEscala.forEach(item => {
        doc.fontSize(12).text(`${item.Nome} - ${item.Funcao} - ${item.Dia} - Culto: ${item.Culto}`);
    });

    doc.end();
}

module.exports = {
    gerarPDF
};
