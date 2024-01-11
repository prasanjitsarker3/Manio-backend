import nodemailer from "nodemailer";
import config from "../config";

export const sendMailer = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.projectProcess === "production",
    auth: {
      user: "sarkerprasanjit379@gmail.com",
      pass: "euhr dbnu cidz xrob",
    },
  });

  await transporter.sendMail({
    from: "sarkerprasanjit379@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Change Password", // Subject line
    text: "You can access this link for changing your password within the next 10 minutes. Act quickly to secure your account.", // plain text body
    html: link, // html body
  });
};
