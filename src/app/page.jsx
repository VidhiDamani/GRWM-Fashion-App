'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredItems } from '@/utils/storage';
import ItemCard from '@/components/ItemCard';
import Toast from '@/components/Toast';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const loaded = getStoredItems();
    setItems(loaded);
  }, []);

  const totalItems = items.length;
  const favoriteItemsCount = items.filter(i => i.favorite).length;
  const ethnicItemsCount = items.filter(i => 
    i.subcategory === 'saree' || 
    i.subcategory === 'kurta' || 
    i.subcategory === 'anarkali' || 
    i.subcategory === 'lehenga skirt' || 
    i.subcategory === 'choli' || 
    (i.occasion && i.occasion.some(o => ['diwali', 'garba', 'wedding', 'puja'].includes(o)))
  ).length;

  const handleToggleFavorite = (id) => {
    const updated = items.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item);
    setItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grwm_wardrobe_items_v1', JSON.stringify(updated));
    }
    setToastMessage('WARDROBE ITEM FAVORITE STATUS UPDATED');
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grwm_wardrobe_items_v1', JSON.stringify(updated));
    }
    setToastMessage('ITEM REMOVED FROM WARDROBE');
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type="success" 
          onClose={() => setToastMessage(null)} 
        />
      )}

      {/* Hero Banner */}
      <section className="relative glass-panel rounded-3xl p-8 lg:p-12 border border-amber-500/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col max-w-3xl gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-gold text-[11px] font-black uppercase tracking-widest self-start">
            INDIAN COLLEGE FASHION APP
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-100 tracking-tight leading-tight">
            YOUR DIGITAL WARDROBE & <span className="text-gradient-gold">OUTFIT STYLIST</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Organize your clothes, get instant outfit suggestions for college lectures, Garba nights, Diwali parties, and weddings. Never wonder what to wear again.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link
              href="/recommendations"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-amber-500/25 transition-all"
            >
              I HAVE NOTHING TO WEAR
            </Link>
            <Link
              href="/wardrobe"
              className="px-6 py-3 rounded-xl border border-white/20 hover:border-amber-400/50 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
            >
              EXPLORE WARDROBE ({totalItems})
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TOTAL CLOTHES</span>
          <span className="text-3xl font-extrabold font-heading text-amber-400">{totalItems}</span>
          <span className="text-[11px] text-slate-500 font-medium">In your closet</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SAVED FAVORITES</span>
          <span className="text-3xl font-extrabold font-heading text-rose-400">{favoriteItemsCount}</span>
          <span className="text-[11px] text-slate-500 font-medium">Starred outfits</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">INDIAN FESTIVE WEAR</span>
          <span className="text-3xl font-extrabold font-heading text-emerald-400">{ethnicItemsCount}</span>
          <span className="text-[11px] text-slate-500 font-medium">Diwali & Garba ready</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DAILY WEARABLE PAIRS</span>
          <span className="text-3xl font-extrabold font-heading text-purple-400">{Math.max(12, totalItems * 3)}</span>
          <span className="text-[11px] text-slate-500 font-medium">Possible combinations</span>
        </div>
      </section>

      {/* Indian Festival & Event Quick Presets */}
      <section className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">STYLING ASSISTANT</span>
          <h2 className="text-xl font-bold font-heading text-slate-100 uppercase tracking-wide">
            WHAT IS THE OCCASION TODAY?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { name: 'GARBA NIGHT', sub: 'Navratri Chaniya Choli & Silver Jhumkas', href: '/recommendations?occasion=garba' },
            { name: 'DIWALI CELEBRATION', sub: 'Silk Sarees, Anarkalis & Festive Wear', href: '/recommendations?occasion=diwali' },
            { name: 'COLLEGE LECTURE', sub: 'Comfy Kurta & Jeans / Crop Tops', href: '/recommendations?occasion=college' },
            { name: 'WEDDING SANGEET', sub: 'Heavy Lehengas & Designer Tops', href: '/recommendations?occasion=wedding' },
            { name: 'CASUAL CAFE DATE', sub: 'Chic Western Wear & Kolhapuris', href: '/recommendations?occasion=casual' },
          ].map((evt, idx) => (
            <Link
              key={idx}
              href={evt.href}
              className="glass-panel glass-panel-hover p-4 rounded-xl border border-white/10 flex flex-col justify-between gap-3 group"
            >
              <div>
                <span className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors uppercase tracking-wider block">
                  {evt.name}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block leading-snug">
                  {evt.sub}
                </span>
              </div>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                GENERATE OUTFIT &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Wardrobe Showcase */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">CLOSET PREVIEW</span>
            <h2 className="text-xl font-bold font-heading text-slate-100 uppercase tracking-wide">
              RECENT WARDROBE ITEMS
            </h2>
          </div>
          <Link
            href="/wardrobe"
            className="text-xs font-bold text-amber-400 hover:underline uppercase tracking-wider"
          >
            VIEW ALL ({totalItems}) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(0, 4).map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={(selected) => setSelectedItem(selected)}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      </section>

      {/* Selected Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full rounded-2xl p-6 border border-amber-500/30 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                CLOTHING ITEM DETAILS
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-2.5 py-1 rounded border border-white/20 text-xs font-bold text-slate-300 hover:text-white"
              >
                CLOSE
              </button>
            </div>

            <div className="flex gap-4">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.subcategory}
                className="w-32 h-40 object-cover rounded-xl border border-white/10"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 uppercase">
                    {selectedItem.colorName || selectedItem.color} {selectedItem.subcategory}
                  </h3>
                  <p className="text-xs text-slate-400 capitalize mt-1">
                    Category: {selectedItem.category} | Fabric: {selectedItem.fabric}
                  </p>
                  <p className="text-xs text-slate-400 capitalize">
                    Vibe: {selectedItem.vibe} | Size: {selectedItem.size} | Brand: {selectedItem.brand}
                  </p>
                </div>
                <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  FORMALITY RATING: {selectedItem.formality} / 5
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-end gap-3">
              <button
                onClick={() => {
                  handleToggleFavorite(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 rounded-xl border border-amber-500/40 text-amber-400 text-xs font-bold uppercase"
              >
                {selectedItem.favorite ? 'REMOVE FAVORITE' : 'MARK AS FAVORITE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
