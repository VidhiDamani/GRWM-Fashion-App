'use client';

import React from 'react';

export default function OutfitCard({ outfit, onWearToday, onSaveOutfit }) {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-amber-500/25 flex flex-col justify-between gap-6 relative overflow-hidden group">
      {/* Accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500" />

      {/* Outfit Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-amber-400">
            {outfit.tag || 'RECOMMENDED OUTFIT'}
          </span>
          <h3 className="text-lg font-bold font-heading text-slate-100 uppercase tracking-wide mt-0.5">
            {outfit.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full badge-emerald text-xs font-black tracking-wider">
            {outfit.matchPercentage}% MATCH
          </span>
          <span className="px-2.5 py-1 rounded-full badge-gold text-[10px] font-bold tracking-wider uppercase">
            HARMONY {outfit.colorHarmonyScore}/10
          </span>
        </div>
      </div>

      {/* Grid of Clothing Items in Outfit */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {outfit.items.map((item, idx) => (
          <div key={idx} className="bg-slate-900/80 rounded-xl overflow-hidden border border-white/10 p-2 flex flex-col">
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-950 mb-2">
              <img
                src={item.imageUrl}
                alt={item.subcategory || item.category}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">
              {item.category}
            </span>
            <span className="text-xs font-bold text-slate-200 capitalize truncate">
              {item.subcategory || item.category}
            </span>
            <span className="text-[10px] text-slate-400 capitalize">
              {item.colorName || item.color}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400 font-medium">
          INCLUDES {outfit.items.length} MATCHED PIECES FROM WARDROBE
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSaveOutfit(outfit)}
            className="px-4 py-2 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs font-bold uppercase tracking-wider transition-all"
          >
            SAVE OUTFIT
          </button>
          <button
            onClick={() => onWearToday(outfit)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
          >
            WEAR TODAY
          </button>
        </div>
      </div>
    </div>
  );
}
