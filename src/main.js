const { authenticate, downloadCSVFile } = require('./drive/driver');
const { processarCSV } = require('./csvProcessor');
const { gerarPDF } = require('./pdfGenerator');
const { enviarEmail } = require('./email');
const { enviarWhatsApp } = require('./whatsapp');
const path = require('path');

async function main() {
    try {
        // Autentica e baixa o CSV
        const auth = await authenticate();
        return
        const arquivoCSV = await downloadCSVFile(auth);
        
        // Processa o CSV
        const dadosEscala = await processarCSV(arquivoCSV);
        
        // Gera o PDF
        const pdfPath = path.join(__dirname, '../uploads', 'escala_voluntarios.pdf');
        await gerarPDF(dadosEscala, pdfPath);
        
        // Envia o PDF por e-mail
        // await enviarEmail(pdfPath);
        
        // Envia o PDF pelo WhatsApp
        // await enviarWhatsApp(pdfPath);
        
    } catch (err) {
        console.error('Erro:', err);
    }
}

main();
