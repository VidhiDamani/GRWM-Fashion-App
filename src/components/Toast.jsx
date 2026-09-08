'use client';

import React from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce-short">
      <div className={`px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-center justify-between gap-4 ${
        isSuccess 
          ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40' 
          : 'bg-rose-950/90 text-rose-200 border-rose-500/40'
      }`}>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest opacity-75">
            {isSuccess ? 'SUCCESS' : 'NOTICE'}
          </span>
          <span className="text-sm font-medium mt-0.5">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-bold tracking-wider px-2 py-1 rounded border border-current opacity-70 hover:opacity-100 transition-opacity"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
