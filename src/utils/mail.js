import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) =>{
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Project Management",
            link: "https://mailgen.js/"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

    const emailHtml = mailGenerator.generate(options.mailgenContent);

    let transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from : "mail.projectmanagement@example.com",
        to : options.email,
        subject : options.subject,
        text : emailTextual,
        html : emailHtml
    }

    try{
        await transporter.sendMail(mail);
    } catch(error){
        console.log(error);
    }
}

const emailVerificationContent = (username,verificationUrl)=>{
    return {
        body:{
            name: username,
            intro: "Welcome to Project Management! We're very excited to have you on board.",
            action: {
                instructions: "To get started with Project Management, please click here:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Verify your account",
                    link: verificationUrl
                },
            },
            outro: "Need help or have questions? Just reply to this email, we'd love to help."
        },
    };
};

const forgotPasswordContent = (username,passwordResetUrl)=>{
    return {
        body:{
            name: username,
            intro: "You have received this email because a password reset request for your account was received.",
            action: {
                instructions: "Click the button below to reset your password:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Reset your password",
                    link: passwordResetUrl
                },
            },
             outro: "Need help or have questions? Just reply to this email, we'd love to help."
        },
    };
};


export {emailVerificationContent,forgotPasswordContent,sendEmail};