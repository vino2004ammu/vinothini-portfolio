import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple rate-limiting map to protect against spam / flooding (per IP)
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Helper for email regex validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Helper to escape HTML characters in email body to prevent HTML injection
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// -------------------------------------------------------------
// Profile photo API (kept intact for custom profile picture upload)
// -------------------------------------------------------------
app.all('/api/profile-photo', (req: Request, res: Response) => {
  const publicFile = path.resolve(process.cwd(), 'public/images/profile_user.jpg');
  const portfolioFile = path.resolve(process.cwd(), 'portfolio/images/profile_user.jpg');

  if (req.method === 'POST') {
    try {
      const data = req.body;
      if (data && data.image) {
        const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(publicFile, buffer);
        try {
          fs.writeFileSync(portfolioFile, buffer);
        } catch {
          // directory might not exist
        }
        res.json({ success: true, url: '/images/profile_user.jpg' });
        return;
      }
    } catch (err) {
      console.error('Error saving profile photo to disk:', err);
    }
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }

  if (req.method === 'GET') {
    if (fs.existsSync(publicFile)) {
      const stats = fs.statSync(publicFile);
      res.json({ exists: true, url: `/images/profile_user.jpg?t=${stats.mtimeMs}` });
    } else {
      res.json({ exists: false });
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      if (fs.existsSync(publicFile)) fs.unlinkSync(publicFile);
      if (fs.existsSync(portfolioFile)) fs.unlinkSync(portfolioFile);
    } catch {
      // ignore
    }
    res.json({ success: true });
    return;
  }

  res.status(405).end();
});

// -------------------------------------------------------------
// Contact Form API: Visitor -> Contact Form -> Backend/API -> Email Service -> Recipient Email Inbox
// -------------------------------------------------------------
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    
    // Spam rate limit check
    const now = Date.now();
    const rateData = rateLimitMap.get(clientIp);
    if (rateData) {
      if (now - rateData.firstRequestTime < RATE_LIMIT_WINDOW_MS) {
        if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
          res.status(429).json({
            success: false,
            error: 'Too many messages sent. Please wait a minute and try again.',
          });
          return;
        }
        rateData.count++;
      } else {
        rateLimitMap.set(clientIp, { count: 1, firstRequestTime: now });
      }
    } else {
      rateLimitMap.set(clientIp, { count: 1, firstRequestTime: now });
    }

    const { name, email, message } = req.body;

    // Strict validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName) {
      res.status(400).json({ success: false, error: 'Name is required' });
      return;
    }

    if (!trimmedEmail) {
      res.status(400).json({ success: false, error: 'Email is required' });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      res.status(400).json({ success: false, error: 'Please enter a valid email address' });
      return;
    }

    if (!trimmedMessage) {
      res.status(400).json({ success: false, error: 'Message is required' });
      return;
    }

    // Destination email address (Vinothini's verified email address)
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'vino2004ammu@gmail.com';

    // Email format specified by user:
    // Subject: New Portfolio Contact Message from [Visitor Name]
    // Email body:
    // Name: [Visitor Name]
    // Email: [Visitor Email]
    // Message:
    // [Visitor Message]
    const subject = `New Portfolio Contact Message from ${trimmedName}`;
    const plainTextBody = `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
        <h2 style="color: #0f172a; margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #d4af37; font-size: 20px;">
          New Portfolio Contact Message
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 80px;">Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${escapeHtml(trimmedName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email:</td>
            <td style="padding: 8px 0; color: #0f172a;">
              <a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #b45309; text-decoration: none; font-weight: 500;">
                ${escapeHtml(trimmedEmail)}
              </a>
            </td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <div style="font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
            Message:
          </div>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155;">
${escapeHtml(trimmedMessage)}
          </div>
        </div>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          Sent from Vinothini I.'s Portfolio Website · Reply directly to this email to respond to ${escapeHtml(trimmedName)}
        </div>
      </div>
    `;

    console.log('----------------------------------------------------');
    console.log(`[CONTACT FORM] Message submission for ${recipientEmail}:`);
    console.log(`From (Reply-To): ${trimmedName} <${trimmedEmail}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${plainTextBody}`);
    console.log('----------------------------------------------------');

    let deliveryStatus = 'received';
    let activationNotice: string | undefined = undefined;

    // Delivery Method 1: If SMTP credentials exist (e.g. Gmail App Password login)
    const smtpHost = process.env.SMTP_HOST || (process.env.SMTP_USER ? 'smtp.gmail.com' : undefined);
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"${trimmedName} (via Portfolio)" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: trimmedEmail,
          subject: subject,
          text: plainTextBody,
          html: htmlBody,
        });

        deliveryStatus = 'dispatched_smtp';
        console.log(`[CONTACT FORM] Email successfully sent via SMTP to ${recipientEmail} from ${trimmedEmail}`);
      } catch (smtpErr) {
        console.error('[CONTACT FORM SMTP ERROR]:', smtpErr);
      }
    }

    // Delivery Method 2: If SMTP was not used or failed, dispatch via FormSubmit HTTP API to Vinothini's email
    if (deliveryStatus !== 'dispatched_smtp') {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'https://vino2004ammu.github.io',
            'Referer': 'https://vino2004ammu.github.io/My_Portfolio-/',
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            _replyto: trimmedEmail,
            _subject: subject,
            message: trimmedMessage,
            _template: 'table',
          }),
        });
        const fsData = await fsRes.json().catch(() => ({} as any));
        console.log('[CONTACT FORM] FormSubmit response:', fsData);
        if (fsData?.success === true || fsData?.success === 'true') {
          deliveryStatus = 'dispatched_formsubmit';
        } else if (typeof fsData?.message === 'string' && fsData.message.includes('Activation')) {
          deliveryStatus = 'formsubmit_pending_activation';
          activationNotice = `FormSubmit sent a one-time activation link to ${recipientEmail}. Please click 'Activate Form' in your inbox to enable direct visitor message delivery.`;
        }
      } catch (fsErr) {
        console.error('[CONTACT FORM FORMSUBMIT ERROR]:', fsErr);
      }
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      status: deliveryStatus,
      activationNotice,
    });
  } catch (error) {
    console.error('[CONTACT FORM ERROR]:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
});

// -------------------------------------------------------------
// Vite middleware integration (for dev) & static serving (for prod)
// -------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
