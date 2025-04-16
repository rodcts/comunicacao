const nodemailer = require('nodemailer');
const config = require('../config/config');

function enviarEmail(pdfPath) {
    const transporter = nodemailer.createTransport({
        host: config.emailSMTPHost,
        port: config.emailSMTPPort,
        secure: false,
        auth: {
            user: config.emailSMTPUser,
            pass: config.emailSMTPPass
        }
    });

    const mailOptions = {
        from: config.emailFrom,
        to: config.emailTo,
        subject: 'Escala de Voluntários',
        text: 'Aqui está a escala de voluntários em anexo.',
        attachments: [
            {
                filename: 'escala_voluntarios.pdf',
                path: pdfPath
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Erro ao enviar e-mail:', error);
        }
        console.log('E-mail enviado:', info.response);
    });
}

module.exports = {
    enviarEmail
};
