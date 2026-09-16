import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="flex items-center gap-2 p-3 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700 font-medium animate-fade-in">
          <svg className="w-4 h-4 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Thank you! You are now subscribed to PCB Indonesia updates.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Your email address"
            className={`w-full pr-12 pl-4 py-2.5 text-xs bg-white text-dark rounded-lg border placeholder:text-secondary/60 focus:outline-none transition-all ${
              status === 'error' ? 'border-red-500 ring-1 ring-red-500' : 'border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
            }`}
            aria-label="Email address for newsletter"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            aria-label="Subscribe to newsletter"
            className="absolute right-1.5 p-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-1.5 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
