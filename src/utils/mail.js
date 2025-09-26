import Mailgen from "mailgen";

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


export {emailVerificationContent,forgotPasswordContent};