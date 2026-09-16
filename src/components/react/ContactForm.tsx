import React, { useState } from 'react';

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'PCB Fabrication',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) errs.message = 'Please provide project details';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-brand-50 border border-brand-200 rounded-2xl text-center space-y-4 animate-fade-in">
        <div className="w-14 h-14 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-brand-500/20">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-dark">Message Sent Successfully!</h3>
        <p className="text-sm text-secondary max-w-md mx-auto">
          Thank you, <span className="font-semibold text-dark">{formData.fullName}</span>. Our technical sales engineering team in Bogor will review your requirements and respond within 2 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFormData({
              fullName: '',
              company: '',
              email: '',
              phone: '',
              projectType: 'PCB Fabrication',
              message: '',
            });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-card">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Ir. Budi Santoso"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-surface transition-all focus:bg-white focus:outline-none ${
              errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="company">
            Company / Organization
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="PT Inovasi Elektronika"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface transition-all focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="email">
            Business Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="budi@perusahaan.co.id"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-surface transition-all focus:bg-white focus:outline-none ${
              errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="phone">
            Phone / WhatsApp Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+62 812 3456 7890"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface transition-all focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="projectType">
          Project Type
        </label>
        <select
          id="projectType"
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface transition-all focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        >
          <option value="PCB Fabrication">PCB Fabrication (Rigid / Multilayer)</option>
          <option value="PCB Assembly (PCBA)">PCB Assembly (PCBA Turnkey)</option>
          <option value="PCB Design Support">PCB Design Support / DFM Review</option>
          <option value="Prototype & Custom">Prototype & Custom Small-Batch</option>
          <option value="Box Build / Electronics">Full Box Build & System Integration</option>
          <option value="General Inquiry">General Partnership Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="message">
          Project Details & Technical Inquiries <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about layer count, estimated volumes, target timelines, and any specific materials needed..."
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-surface transition-all focus:bg-white focus:outline-none ${
            errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
          }`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-all shadow-md shadow-brand-500/20 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Submitting Details...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
