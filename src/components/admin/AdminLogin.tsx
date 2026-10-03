import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin } = useCatalog();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter the admin passcode');
      return;
    }

    const success = adminLogin(passcode);
    if (!success) {
      setError('Incorrect passcode. Please try again.');
    } else {
      setError('');
    }
  };

  const fillDefaultPasscode = () => {
    setPasscode('flyers2026');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-tech">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8302B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-950/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top store return link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center text-xs">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#E8302B]" />
          <span>Back to Live Store</span>
        </Link>
        <span className="text-neutral-500 uppercase tracking-widest text-[10px]">
          Flyer's Internal System
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#101014] border border-[#27272e] p-6 sm:p-8 rounded-lg shadow-2xl relative z-10 clip-corner-cut">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E8302B]/15 border border-[#E8302B]/30 mb-3 red-glow">
            <Lock className="w-7 h-7 text-[#E8302B]" />
          </div>
          <div className="flex justify-center mb-2">
            <img
              src="/assets/theflyers.logo.png"
              alt="The Flyer's"
              className="h-8 w-auto object-contain"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-racing font-bold text-white uppercase tracking-wider">
            ADMIN PORTAL
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Access catalog management, tyre inventory, customer leads & store controls.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-950/40 border border-red-800/80 rounded text-red-300 text-xs flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-neutral-300 text-xs uppercase tracking-wider mb-2 font-semibold">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder="Enter master passcode"
                className="w-full px-4 py-3 bg-[#18181f] border border-[#33333d] focus:border-[#E8302B] rounded text-white text-sm outline-none transition-colors pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-[#1a1a20] border-neutral-700 text-[#E8302B] focus:ring-0"
              />
              <span>Remember this session</span>
            </label>

            <button
              type="button"
              onClick={fillDefaultPasscode}
              className="text-[#E8302B] hover:underline flex items-center gap-1 text-[11px]"
            >
              <KeyRound className="w-3 h-3" />
              <span>Use Default PIN</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase tracking-wider text-base rounded transition-all clip-slant-button red-glow flex items-center justify-center space-x-2 mt-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>AUTHENTICATE & ENTER</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-800/80 text-center">
          <p className="text-[11px] text-neutral-500">
            Default passkey: <code className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded font-mono">flyers2026</code>
          </p>
        </div>
      </div>
    </div>
  );
};
