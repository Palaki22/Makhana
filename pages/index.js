import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        if (window.fbq) window.fbq('track', 'CompleteRegistration');
        if (window.gtag) window.gtag('event', 'sign_up', { method: 'waitlist' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 text-gray-900">
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <img src="/logo.svg" alt="Makhana Logo" className="w-28 h-28 mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Pure. Rare. The Power of Lotus.</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
          An ancient Indian superfood, reimagined for the world — healthy, guilt-free, and exquisite.
        </p>
      </section>

      <section className="py-20 px-6 text-center bg-green-100">
        <h2 className="text-3xl font-bold mb-4">Be the First to Taste the Lotus Superfood</h2>
        <p className="text-gray-600 mb-6">Sign up now & enjoy 10% off your first order at launch.</p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="rounded-2xl p-4 flex-grow border border-gray-300" />
          <button type="submit" className="bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-green-700 transition">
            Notify Me
          </button>
        </form>
        {status === 'loading' && <p className="mt-4">Submitting...</p>}
        {status === 'success' && <p className="mt-4 text-green-600">You’re on the waitlist!</p>}
        {status === 'error' && <p className="mt-4 text-red-600">Something went wrong. Try again.</p>}
      </section>

      <footer className="py-8 text-center text-gray-500 bg-white border-t">
        <p>© 2025 Makhana | Pure. Rare. The Power of Lotus.</p>
      </footer>
    </div>
  );
}
