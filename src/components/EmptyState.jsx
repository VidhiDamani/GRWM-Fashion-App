'use client';

import React from 'react';
import Link from 'next/link';

export default function EmptyState({ 
  title = "No Wardrobe Items Found", 
  description = "No items matched your selected category, occasion, or search criteria.",
  actionText = "Add New Item",
  actionHref = "/add-item",
  onReset
}) {
  return (
    <div className="w-full py-16 px-6 glass-panel rounded-2xl text-center flex flex-col items-center justify-center max-w-xl mx-auto my-8 border border-white/10">
      <div className="px-4 py-1.5 rounded-full badge-gold text-xs font-bold uppercase tracking-widest mb-4">
        EMPTY STATE
      </div>
      <h3 className="text-2xl font-bold text-slate-100 font-heading mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-8">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl border border-white/20 text-slate-300 hover:text-white hover:border-white/40 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Clear Filters
          </button>
        )}
        {actionHref && (
          <Link
            href={actionHref}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
          >
            {actionText}
          </Link>
        )}
      </div>
    </div>
  );
}
