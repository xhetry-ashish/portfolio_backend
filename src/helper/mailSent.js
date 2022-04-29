import nodemailer from "nodemailer";
import "dotenv/config";

const mailSender = (email, username, message) => {
  var transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  var mailOptions = {
    from: email,
    to: "no-reply@gmail.com",
    subject: `Message from ${email}`,
    html: `<h2> You received a message from ${username}!</h2>
          <br>${message}
          <h4>Sincerely</h4>
          <h3>${username}`,
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
