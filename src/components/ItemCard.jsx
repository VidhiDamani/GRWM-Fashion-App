'use client';

import React from 'react';

export default function ItemCard({ item, onSelect, onToggleFavorite, onDelete }) {
  const getBadgeClass = (cat) => {
    switch (cat) {
      case 'top': return 'badge-gold';
      case 'bottom': return 'badge-purple';
      case 'dress': return 'badge-maroon';
      case 'footwear': return 'badge-emerald';
      default: return 'badge-gold';
    }
  };

  const formattedDate = item.lastWorn
    ? new Date(item.lastWorn).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    : 'NEVER WORN';

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-white/10">
      {/* Image Wrapper */}
      <div 
        onClick={() => onSelect(item)}
        className="relative w-full aspect-[4/5] bg-slate-900 overflow-hidden cursor-pointer"
      >
        <img
          src={item.imageUrl}
          alt={`${item.subcategory || item.category} in ${item.color}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Favorite Text Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all ${
            item.favorite 
              ? 'bg-amber-500 text-slate-950 shadow-md' 
              : 'bg-black/60 text-slate-300 border border-white/20 hover:bg-black/80'
          }`}
        >
          {item.favorite ? 'SAVED' : 'SAVE'}
        </button>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${getBadgeClass(item.category)}`}>
            {item.subcategory || item.category}
          </span>
        </div>
      </div>

      {/* Item Body */}
      <div className="p-4 flex flex-col justify-between flex-grow gap-3">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-slate-100 uppercase tracking-wide truncate">
              {item.colorName || item.color} {item.subcategory || item.category}
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1 capitalize">
            {item.fabric} • {item.vibe || 'casual'} vibe
          </p>
        </div>

        {/* Occasions Tags */}
        {item.occasion && Array.isArray(item.occasion) && (
          <div className="flex flex-wrap gap-1">
            {item.occasion.slice(0, 3).map((occ, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-amber-300 uppercase tracking-wider"
              >
                {occ}
              </span>
            ))}
          </div>
        )}

        {/* Item Footer info */}
        <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase">
          <span>WORN: {formattedDate}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(item)}
              className="text-amber-400 hover:underline tracking-widest font-bold"
            >
              DETAILS
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-rose-400 hover:text-rose-300 tracking-widest font-bold ml-1"
            >
              DEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
