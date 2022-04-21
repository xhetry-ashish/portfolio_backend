import nodemailer from "nodemailer";
import "dotenv/config";

const mailSender = (email, username) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  var mailOptions = {
    from: "noreply@gmail.com",
    to: email,
    subject: "Thanks for your response",
    html: `<h2 >Hello ${username}!</h2>, 
          <br>Thank you for submitting the form. Your information is recorded. I will get to you soon
          <br>
          <h4>Sincerely</h4>,<br>
          <h3>Ashish`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

export default mailSender;
