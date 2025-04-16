const twilio = require('twilio');
const config = require('../config/config');

const client = twilio(config.twilioSID, config.twilioAuthToken);

function enviarWhatsApp(pdfPath) {
    client.messages.create({
        from: config.twilioWhatsAppNumber,
        to: 'whatsapp:+seu_numero', // Número do destinatário
        body: 'Aqui está a escala de voluntários!',
        mediaUrl: [pdfPath]  // URL para o PDF (precisa estar hospedado)
    }).then(message => {
        console.log('WhatsApp enviado com sucesso:', message.sid);
    }).catch(err => {
        console.error('Erro ao enviar WhatsApp:', err);
    });
}

module.exports = {
    enviarWhatsApp
};
