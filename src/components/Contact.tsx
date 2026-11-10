import { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { Github, Linkedin, Mail, Download, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactProps {
  onOpenResume?: () => void;
}

export default function Contact({ onOpenResume }: ContactProps) {
  const { personal } = PORTFOLIO_CONFIG;
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (values: FormState): FormErrors => {
    const errs: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name.trim()) {
      errs.name = 'Please enter your name';
    }

    if (!values.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!emailRegex.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!values.message.trim()) {
      errs.message = 'Please enter your message';
    }

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentValidation = validate(formState);
    if (currentValidation[field]) {
      setErrors((prev) => ({ ...prev, [field]: currentValidation[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validate(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let resOk = false;
      let resData: any = null;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            message: formState.message.trim(),
          }),
        });

        if (response.ok) {
          resData = await response.json().catch(() => null);
          if (resData?.success) {
            resOk = true;
          }
        }
      } catch {
        // fallback below
      }

      // Direct fallback if /api/contact is unavailable (e.g. static hosting on Vercel)
      if (!resOk) {
        const directRes = await fetch('https://formsubmit.co/ajax/vino2004ammu@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            _replyto: formState.email.trim(),
            _subject: `New Portfolio Message from ${formState.name.trim()}`,
            message: formState.message.trim(),
          }),
        });

        if (directRes.ok) {
          resOk = true;
        }
      }

      if (resOk) {
        setSubmitSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setErrors({});
        setTouched({});
        setTimeout(() => setSubmitSuccess(false), 8000);
      } else {
        setSubmitError(resData?.error || 'Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error('Contact error:', err);
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { icon: Github, href: personal.github, label: 'GitHub', value: 'vino2004ammu' },
    { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn', value: 'vinothini-i' },
    { icon: Mail, href: `mailto:${personal.email}`, label: 'Email', value: personal.email },
  ];

  const inputClasses =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-sm text-white placeholder:text-noir-muted focus:border-[#eab308]/70 focus:outline-none focus:ring-2 focus:ring-[#eab308]/20 transition-all';

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-noir-bg px-6 py-24">
      {/* Ambient background glow in Warm Mustard */}
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[400px] w-[400px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #eab308, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Header Reveal */}
        <ScrollReveal direction="up" distance={30} duration={600}>
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-noir-cream/75">
            Reach out
          </p>

          <h2 className="mb-12 font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
            Get In <span className="text-[#eab308]">Touch</span>
          </h2>
        </ScrollReveal>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column: Direct Connect & Resume */}
          <ScrollReveal direction="up" distance={35} delay={100} duration={700}>
            <div className="h-full rounded-3xl border border-white/10 bg-[#050505]/40 p-8 flex flex-col justify-between">
              <div>
                <h3 className="mb-6 font-sans text-2xl font-bold text-white">
                  Let's Connect
                </h3>

                {/* Contact Links */}
                <div className="space-y-3.5 mb-6">
                  {contactLinks.map(({ icon: Icon, href, label, value }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 font-sans text-noir-cream transition-all hover:border-[#eab308]/40 hover:bg-[#eab308]/[0.06] hover:text-white"
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className="text-xl text-[#eab308]" />
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-noir-muted">
                            {label}
                          </span>
                          <span className="text-sm font-medium text-white">{value}</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#eab308]">Open →</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Resume Download in Warm Mustard */}
              <div className="pt-2">
                <a
                  href="/resume/Vinothini_I_Resume.pdf"
                  download="Vinothini_I_Resume.pdf"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#eab308] to-[#ca8a04] px-6 py-3.5 font-sans text-sm font-semibold text-noir-bg shadow-[0_0_24px_rgba(234,179,8,0.30)] transition hover:brightness-110 active:scale-98"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Clean 3-Field Contact Form */}
          <ScrollReveal direction="up" distance={35} delay={200} duration={700}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="h-full rounded-3xl border border-white/10 bg-[#050505]/40 p-8 flex flex-col justify-between"
            >
            <div>
              <h3 className="mb-6 font-sans text-2xl font-bold text-white">
                Send Message
              </h3>

              {/* Status Notifications */}
              {submitSuccess && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-400/40 bg-green-500/10 p-4 font-sans text-sm text-green-300 animate-in fade-in duration-200">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitError && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-400/40 bg-red-500/10 p-4 font-sans text-sm text-red-300 animate-in fade-in duration-200">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                  <span>Something went wrong. Please try again later.</span>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {/* 1. Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-sans text-sm font-medium text-noir-cream/90"
                  >
                    Your Name <span className="text-[#eab308]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="Your Name"
                    disabled={isSubmitting}
                    className={`${inputClasses} ${
                      touched.name && errors.name ? 'border-red-500/80' : ''
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-400 font-sans">{errors.name}</p>
                  )}
                </div>

                {/* 2. Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-sans text-sm font-medium text-noir-cream/90"
                  >
                    Your Email <span className="text-[#eab308]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="you@email.com"
                    disabled={isSubmitting}
                    className={`${inputClasses} ${
                      touched.email && errors.email ? 'border-red-500/80' : ''
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-400 font-sans">{errors.email}</p>
                  )}
                </div>

                {/* 3. Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-sans text-sm font-medium text-noir-cream/90"
                  >
                    Your Message <span className="text-[#eab308]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell me about the role, project, or opportunity..."
                    disabled={isSubmitting}
                    className={`${inputClasses} resize-none ${
                      touched.message && errors.message ? 'border-red-500/80' : ''
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1 text-xs text-red-400 font-sans">{errors.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button in Warm Mustard */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#eab308] to-[#ca8a04] px-6 py-3.5 font-sans text-sm font-semibold text-noir-bg shadow-[0_0_24px_rgba(234,179,8,0.30)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </ScrollReveal>
        </div>

        {/* Quiet Single-Line Footer */}
        <ScrollReveal direction="up" distance={20} delay={100} duration={600}>
          <footer className="mt-20 border-t border-white/5 pt-8 text-center">
            <p className="font-sans text-sm text-noir-muted">
              © {new Date().getFullYear()} Vinothini I · Full Stack Python Developer
            </p>
          </footer>
        </ScrollReveal>
      </div>
    </section>
  );
}
