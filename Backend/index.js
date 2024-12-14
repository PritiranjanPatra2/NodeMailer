import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
const user=process.env.user;
const pass=process.env.pass;

app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #4CAF50; padding: 20px; color: white; text-align: center;">
        <h1>Welcome to Patra's World</h1>
        <p>Your email delivery is confirmed!</p>
      </div>
      <div style="padding: 20px;">
        <p>Hello ${to},</p>
        <p>Your Message Is :<b> ${message}</b></p>
        <p>Thank you for reaching out. We will get back to you soon!</p>
        <p style="margin-top: 20px;">Best Regards,<br/>The Patra Team</p>
      </div>
      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        <p>&copy; 2024 Patra Inc. All rights reserved.</p>
        <p>
          <a href="#" style="color: #4CAF50; text-decoration: none;">Privacy Policy</a> |
          <a href="#" style="color: #4CAF50; text-decoration: none;">Terms of Service</a>
        </p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"Patra Support Team" <patrapritiranjan957@gmail.com>',
      to,
      subject,
      text: message,
      html: emailTemplate, 
    });

    console.log(`Email sent successfully with ID: ${info.messageId}`);
    res.status(200).send({ 
      status: "success", 
      message: "Your email was sent successfully with a beautiful design!" 
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).send({ 
      status: "error", 
      message: "Failed to send your email. Please try again later." 
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
