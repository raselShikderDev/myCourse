import React, { useState } from 'react';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'hello@coursems.dev' },
  { icon: '📍', label: 'Location', value: 'Remote-first, worldwide' },
  { icon: '💬', label: 'Response time', value: 'Within 24 hours' },
];

const faqs = [
  { q: 'How do I enroll in a course?', a: 'Create a free account, browse courses, and click Enroll Now. You can start learning immediately after payment.' },
  { q: 'Can I get a refund?', a: 'Yes. We offer a 30-day money-back guarantee on all courses, no questions asked.' },
  { q: 'Do I get a certificate?', a: 'Yes. All courses include a certificate of completion you can share on LinkedIn and your resume.' },
  { q: 'How long do I have access?', a: 'Lifetime access. Once enrolled, you have access to the course and all future updates forever.' },
];

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="pt-16 min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-brand-950 py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in touch</h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">Have a question or feedback? We'd love to hear from you. Our team typically responds within 24 hours.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-6">
              <h2 className="font-bold text-slate-900 mb-5">Contact information</h2>
              <div className="space-y-4">
                {contactInfo.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-medium text-slate-900">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-6">
              <h2 className="font-bold text-slate-900 mb-5">FAQs</h2>
              <div className="space-y-5">
                {faqs.map(({ q, a }) => (
                  <div key={q}>
                    <p className="text-sm font-semibold text-slate-800 mb-1">{q}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-7">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-5">✅</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="mt-6 text-sm text-brand-600 font-semibold hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-slate-700">Full Name *</label>
                        <input required name="name" value={form.name} onChange={handleChange}
                          placeholder="Jane Smith"
                          className="px-3 py-2.5 text-sm border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-slate-700">Email Address *</label>
                        <input required type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="you@example.com"
                          className="px-3 py-2.5 text-sm border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-slate-700">Subject</label>
                      <select name="subject" value={form.subject} onChange={handleChange}
                        className="px-3 py-2.5 text-sm border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white cursor-pointer transition-all">
                        <option value="">Select a topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="course">Course Question</option>
                        <option value="billing">Billing & Refunds</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-slate-700">Message *</label>
                      <textarea required name="message" value={form.message} onChange={handleChange}
                        rows={6} placeholder="Tell us how we can help..."
                        className="px-3 py-2.5 text-sm border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none transition-all" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-600/20">
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>Send Message →</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};