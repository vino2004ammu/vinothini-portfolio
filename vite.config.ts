import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function profilePhotoPlugin(): Plugin {
  return {
    name: 'profile-photo-api',
    configureServer(server) {
      server.middlewares.use('/api/profile-photo', (req, res) => {
        const publicFile = path.resolve(__dirname, 'public/images/profile_user.jpg');
        const portfolioFile = path.resolve(__dirname, 'portfolio/images/profile_user.jpg');

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.image) {
                const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(publicFile, buffer);
                try {
                  fs.writeFileSync(portfolioFile, buffer);
                } catch {
                  // ignore if directory not available
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: '/images/profile_user.jpg' }));
                return;
              }
            } catch (err) {
              console.error('Error saving profile photo to disk:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else if (req.method === 'GET') {
          if (fs.existsSync(publicFile)) {
            const stats = fs.statSync(publicFile);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ exists: true, url: `/images/profile_user.jpg?t=${stats.mtimeMs}` }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ exists: false }));
          }
        } else if (req.method === 'DELETE') {
          try {
            if (fs.existsSync(publicFile)) fs.unlinkSync(publicFile);
            if (fs.existsSync(portfolioFile)) fs.unlinkSync(portfolioFile);
          } catch {
            // ignore
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(405);
          res.end();
        }
      });

      // Contact Form API in Vite Dev Server
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const { name, email, message } = parsed;

            const trimmedName = typeof name === 'string' ? name.trim() : '';
            const trimmedEmail = typeof email === 'string' ? email.trim() : '';
            const trimmedMessage = typeof message === 'string' ? message.trim() : '';

            if (!trimmedName) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Name is required' }));
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Please enter a valid email address' }));
              return;
            }

            if (!trimmedMessage) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Message is required' }));
              return;
            }

            const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'vino2004ammu@gmail.com';
            const subject = `New Portfolio Contact Message from ${trimmedName}`;
            const plainTextBody = `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;

            console.log('==================================================');
            console.log(`[CONTACT FORM] Message received for ${recipient}`);
            console.log(`From (Reply-To): ${trimmedName} <${trimmedEmail}>`);
            console.log(`Subject: ${subject}`);
            console.log(`Body:\n${plainTextBody}`);
            console.log('==================================================');

            let deliveryMethod = 'logged';
            let activationNotice: string | undefined = undefined;

            // Method 1: If SMTP login credentials exist (e.g. Gmail App Password), send via Nodemailer
            const smtpHost = process.env.SMTP_HOST || (process.env.SMTP_USER ? 'smtp.gmail.com' : undefined);
            const smtpUser = process.env.SMTP_USER;
            const smtpPass = process.env.SMTP_PASS;

            if (smtpHost && smtpUser && smtpPass) {
              try {
                const nodemailer = await import('nodemailer');
                const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
                const secure = process.env.SMTP_SECURE === 'true' || port === 465;
                const transporter = nodemailer.createTransport({
                  host: smtpHost,
                  port,
                  secure,
                  auth: { user: smtpUser, pass: smtpPass },
                });
                await transporter.sendMail({
                  from: `"${trimmedName} (via Portfolio)" <${smtpUser}>`,
                  to: recipient,
                  replyTo: trimmedEmail,
                  subject,
                  text: plainTextBody,
                });
                deliveryMethod = 'smtp';
                console.log('[CONTACT FORM] Successfully sent via SMTP!');
              } catch (mailErr) {
                console.error('[CONTACT FORM SMTP ERROR]:', mailErr);
              }
            }

            // Method 2: If SMTP did not send, deliver over HTTP via FormSubmit to Vinothini's email
            if (deliveryMethod !== 'smtp') {
              try {
                const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
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
                  deliveryMethod = 'formsubmit';
                } else if (typeof fsData?.message === 'string' && fsData.message.includes('Activation')) {
                  deliveryMethod = 'formsubmit_pending_activation';
                  activationNotice = `FormSubmit sent a one-time activation link to ${recipient}. Please click 'Activate Form' in your inbox to enable direct visitor message delivery.`;
                }
              } catch (fsErr) {
                console.error('[CONTACT FORM FORMSUBMIT ERROR]:', fsErr);
              }
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                success: true,
                message: "Message sent successfully! I'll get back to you soon.",
                deliveryMethod,
                activationNotice,
              })
            );
          } catch (err) {
            console.error('[CONTACT FORM ERROR]:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                success: false,
                error: 'Something went wrong. Please try again later.',
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), profilePhotoPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
