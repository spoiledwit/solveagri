import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "credminds@gmail.com", // Sender email
    pass: process.env.EMAIL_PASS || "zmld xfdj gtao izpw", // Email password or app-specific password
  },
});

// Generate a beautified HTML email template
const generateEmailTemplate = (subject: string, content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2fff6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #4caf50;
          color: #fff;
          padding: 20px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
        }
        .email-body {
          padding: 20px;
          line-height: 1.6;
        }
        .email-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">${subject}</div>
        <div class="email-body">${content}</div>
        <div class="email-footer">
          <p>Thank you for contacting us!</p>
          <p>&copy; 2024 Solve Agri Pak</p>
        </div>
      </div>
    </body>
  </html>
`;

// Function to send emails
export const sendEmail = async (
  to: string,
  subject: string,
  content: string,
  isSenderFeedback: boolean = false
) => {
  try {
    const html = generateEmailTemplate(subject, content);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "credminds@gmail.com", // Sender address
      to, // Recipient address
      subject, // Email subject
      html, // HTML body
    });

    console.log(
      isSenderFeedback
        ? `Feedback email sent to sender: ${info.messageId}`
        : `Message sent to recipient: ${info.messageId}`
    );

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
