import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found • GRWM',
  description: 'The requested page or outfit route could not be found on GRWM.',
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 glass-panel rounded-3xl border border-white/10 my-8">
      <div className="px-4 py-1.5 rounded-full badge-maroon text-xs font-black uppercase tracking-widest mb-6">
        ERROR 404
      </div>

      <h1 className="text-4xl sm:text-6xl font-black font-heading text-slate-100 uppercase tracking-tight mb-4">
        OUTFIT PAGE NOT FOUND
      </h1>

      <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed mb-8">
        The fashion page, outfit link, or wardrobe route you are looking for does not exist or has been moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 text-xs font-black uppercase tracking-widest shadow-lg hover:brightness-110 transition-all"
        >
          RETURN TO DASHBOARD
        </Link>
        <Link
          href="/wardrobe"
          className="px-6 py-3 rounded-xl border border-white/20 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-widest transition-all"
        >
          VIEW MY WARDROBE
        </Link>
      </div>
    </div>
  );
}
