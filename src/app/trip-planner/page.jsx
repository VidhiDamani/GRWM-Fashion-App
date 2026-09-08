'use client';

import React, { useState, useEffect } from 'react';
import { getStoredItems } from '@/utils/storage';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';

export default function TripPlannerPage() {
  const [items, setItems] = useState([]);
  const [destination, setDestination] = useState('Jaipur Wedding & Sangeet');
  const [durationDays, setDurationDays] = useState(3);
  const [primaryOccasion, setPrimaryOccasion] = useState('wedding');
  const [weather, setWeather] = useState('normal');
  const [packingList, setPackingList] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const loaded = getStoredItems();
    setItems(loaded);
    if (loaded.length > 0) {
      generatePackingList(loaded, 'wedding', 3);
    }
  }, []);

  const generatePackingList = (wardrobeItems, occ, days) => {
    const selected = [];

    // Filter relevant items
    const festive = wardrobeItems.filter(i => 
      (i.occasion && i.occasion.includes(occ)) || 
      i.subcategory === 'saree' || 
      i.subcategory === 'lehenga skirt' || 
      i.subcategory === 'anarkali' ||
      i.subcategory === 'kurta'
    );

    const tops = wardrobeItems.filter(i => i.category === 'top');
    const bottoms = wardrobeItems.filter(i => i.category === 'bottom');
    const footwear = wardrobeItems.filter(i => i.category === 'footwear');
    const accessories = wardrobeItems.filter(i => i.category === 'accessory');

    // Add festive options
    festive.slice(0, Math.min(days, 3)).forEach(item => selected.push({ ...item, packReason: 'Festive Main Outfit' }));

    // Add daily tops & bottoms
    tops.slice(0, Math.min(days, 3)).forEach(item => selected.push({ ...item, packReason: 'Casual Daily Top' }));
    bottoms.slice(0, Math.min(2, bottoms.length)).forEach(item => selected.push({ ...item, packReason: 'Versatile Bottom' }));

    // Add footwear & accessories
    footwear.slice(0, 2).forEach(item => selected.push({ ...item, packReason: 'Matching Footwear' }));
    accessories.slice(0, 3).forEach(item => selected.push({ ...item, packReason: 'Statement Jewelry' }));

    // Deduplicate
    const uniqueMap = new Map();
    selected.forEach(item => uniqueMap.set(item.id, item));
    const finalItems = Array.from(uniqueMap.values());

    setPackingList(finalItems);
    setCheckedItems({});
    setToastMessage(`PACKING LIST GENERATED FOR ${days}-DAY TRIP!`);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    generatePackingList(items, primaryOccasion, durationDays);
  };

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalPackCount = packingList.length;
  const progressPercent = totalPackCount > 0 ? Math.round((checkedCount / totalPackCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}

      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          TRAVEL & FESTIVAL PACKING ASSISTANT
        </span>
        <h1 className="text-3xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mt-1">
          TRIP PACKING LIST GENERATOR
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl mt-1">
          Planning a 3-day wedding in Jaipur or a 9-day Garba trip to Ahmedabad? Automatically curate and check off wardrobe items to pack.
        </p>
      </div>

      {/* Trip Details Form */}
      <form onSubmit={handleGenerate} className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              DESTINATION & TRIP NAME
            </label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Udaipur Wedding, Goa Trip..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              TRIP DURATION (DAYS)
            </label>
            <input
              type="number"
              min="1"
              max="14"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              PRIMARY EVENT / OCCASION
            </label>
            <select
              value={primaryOccasion}
              onChange={(e) => setPrimaryOccasion(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="wedding">WEDDING / SANGEET</option>
              <option value="garba">GARBA / NAVRATRI</option>
              <option value="diwali">DIWALI CELEBRATION</option>
              <option value="casual">CASUAL VACATION</option>
              <option value="college">COLLEGE TRIP</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 text-xs font-black uppercase tracking-widest shadow-md"
          >
            GENERATE PACKING LIST NOW
          </button>
        </div>
      </form>

      {/* Progress Bar */}
      {packingList.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-200">
              PACKING CHECKLIST PROGRESS ({checkedCount} OF {totalPackCount} ITEMS PACKED)
            </span>
            <span className="text-xs font-extrabold text-amber-400">
              {progressPercent}% COMPLETE
            </span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Packing Checklist Items */}
      {packingList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packingList.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`glass-panel p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-500/50 opacity-80'
                    : 'border-white/10 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] font-bold ${
                    isChecked ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'border-white/30 text-transparent'
                  }`}>
                    X
                  </div>
                  <img
                    src={item.imageUrl}
                    alt={item.subcategory}
                    className="w-14 h-16 object-cover rounded-lg border border-white/10"
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                      {item.packReason}
                    </span>
                    <span className={`text-sm font-bold uppercase ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {item.colorName || item.color} {item.subcategory || item.category}
                    </span>
                    <span className="text-xs text-slate-400 capitalize">
                      {item.fabric} • Size {item.size}
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                  isChecked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-400'
                }`}>
                  {isChecked ? 'PACKED' : 'UNPACKED'}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Items in Packing List"
          description="Your wardrobe does not contain matching clothes for this trip configuration. Add more items to your wardrobe."
          actionText="Add Clothes to Wardrobe"
          actionHref="/add-item"
        />
      )}
    </div>
  );
}
