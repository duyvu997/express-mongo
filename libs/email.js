import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.MAIL_DOMAIN,
  port: 465,
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD || '123456',
  },
});

const initSendActivationCodeTemplate = (to, code) => ({
  from: process.env.EMAIL_NAME,
  to,
  subject: 'Activation Code',
  html: `<h1>Welcome</h1><p>That was easy!</p><p>Your code ${code}</p>`,
});

const initForgotPasswordTemplate = (to, password) => ({
  from: process.env.EMAIL_NAME,
  to,
  subject: 'Reset Password Code',
  html: `<h1>Hi,</h1><p>Your reset password code: ${password}</p>`,
});

const send = async (option) => {
  transporter.sendMail(option, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('[email] sent: ' + info.response);
    }
  });
};

const sendActivateCode = async (to, code) => {
  const option = initSendActivationCodeTemplate(to, code);
  return send(option);
};

const sendResetPassword = async (to, password) => {
  const option = initForgotPasswordTemplate(to, password);
  return send(option);
};

export default { send, sendActivateCode, sendResetPassword };
