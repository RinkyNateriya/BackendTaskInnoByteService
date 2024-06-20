const nodemailer = require('nodemailer');

const sendMailAsync = (to, Link) => {
    // Define the transporter using your Gmail account
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'rnrinkynateriya@gmail.com', // your Gmail account
            pass: 'mshy vskq jmda kmhb' // your app password
        }
    });

    // Define email options
    let mailOptions = {
        from: '"Nodemailer Test" <rnrinkynateriya@gmail.com>', // Sender address
        to:to, // Change your mail Id 
        subject: 'Confirm Your Email', // Subject line
        text: 'Hello world!', // Plain text body
        html: Link // HTML body
    };
    

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};

module.exports = { sendMailAsync };
