import nodemailer from "nodemailer";
import "dotenv/config";

let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

export async function mailer(mailTo, name) {
  try {
    await transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: mailTo,
      subject: "Message Received ",
      text: `Received your message at ${new Date().toDateString()}.
            Thank you ${name} for visiting my website. I will look through your message and contact you back as soon as possible.
            sincerely,
            Ashish Basnet`,
      html: `Received your message at <b>${new Date().toDateString()}.</b><br/><br />
    Thank you <b>${name}</b> for visiting my website. <br/><br/>I will look through your message and contact you back as soon as possible.<br/><br />
    <i>Sincerely</i>,<br/>
    <i>Ashish Basnet</i><br/>`,
    });
    console.log("mail");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function mailerAdmin({ fullName, email, message }) {
  try {
    await transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Message Received",
      text: `Received message at ${new Date().toDateString()}.
        Sender Name: ${fullName} , email Address: ${email},[ ${message} ]`,
      html: `Received message at <b>${new Date().toDateString()}.</b><br/><br />
      <b>Sender Name:</b> <i>${fullName},</i><br/><br/>
      <b>Email ID:</b> <i>${email},</i> <br/><br/>
       <b>Message:</b><br/>
       {<br/>
        ${message}
        <br/>
      }`,
    });
    console.log("adminmail");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
