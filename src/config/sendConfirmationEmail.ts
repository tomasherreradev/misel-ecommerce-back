import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true, // Usa TLS
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ', info.response);
    } catch (error) {
        console.error('Error al enviar el correo: ', error);
    }
};


