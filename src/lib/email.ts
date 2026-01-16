/**
 * Email Service Module using Resend
 *
 * Setup Instructions:
 * 1. Sign up at https://resend.com
 * 2. Get your API key from the dashboard
 * 3. Add RESEND_API_KEY to your .env.local file
 * 4. Verify your domain or use the default onboarding@resend.dev for testing
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Configuration - Update these values
const EMAIL_CONFIG = {
  // Your verified domain email (update after domain verification)
  fromEmail: process.env.FROM_EMAIL || "onboarding@resend.dev",
  // Email where you want to receive contact form submissions
  toEmail: process.env.TO_EMAIL || "gautty97@gmail.com",
  // Email subject prefix
  subjectPrefix: "[Portfolio Contact]",
};

/**
 * Send contact form email using Resend API
 */
export async function sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
  const apiKey = process.env.RESEND_API_KEY;

  // Check if API key is configured
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return {
      success: false,
      message: "Email service is not configured. Please contact directly at " + EMAIL_CONFIG.toEmail,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_CONFIG.fromEmail,
        to: [EMAIL_CONFIG.toEmail],
        subject: `${EMAIL_CONFIG.subjectPrefix} New message from ${data.name}`,
        reply_to: data.email,
        html: generateEmailHTML(data),
        text: generateEmailText(data),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", result);
      return {
        success: false,
        message: result.message || "Failed to send email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Email sent successfully!",
      id: result.id,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "An error occurred while sending the email. Please try again.",
    };
  }
}

/**
 * Generate HTML email template
 */
function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #F2C811 0%, #01B8AA 100%); padding: 30px; text-align: center;">
                    <h1 style="margin: 0; color: #0D1117; font-size: 24px; font-weight: 700;">
                      New Portfolio Contact
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 30px;">
                    <!-- Sender Info -->
                    <div style="margin-bottom: 25px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #0078D4;">
                      <h2 style="margin: 0 0 15px 0; color: #0078D4; font-size: 16px; font-weight: 600;">
                        Sender Information
                      </h2>
                      <p style="margin: 0 0 8px 0; color: #333;">
                        <strong>Name:</strong> ${escapeHtml(data.name)}
                      </p>
                      <p style="margin: 0; color: #333;">
                        <strong>Email:</strong>
                        <a href="mailto:${escapeHtml(data.email)}" style="color: #0078D4; text-decoration: none;">
                          ${escapeHtml(data.email)}
                        </a>
                      </p>
                    </div>

                    <!-- Message -->
                    <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #F2C811;">
                      <h2 style="margin: 0 0 15px 0; color: #F2C811; font-size: 16px; font-weight: 600;">
                        Message
                      </h2>
                      <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">
                        ${escapeHtml(data.message)}
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #0D1117; text-align: center;">
                    <p style="margin: 0; color: #8B949E; font-size: 12px;">
                      This email was sent from your portfolio contact form.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/**
 * Generate plain text email
 */
function generateEmailText(data: ContactFormData): string {
  return `
New Contact Form Submission
===========================

From: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This email was sent from your portfolio contact form.
  `.trim();
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}
