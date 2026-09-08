'use client';

import React, { useState, useEffect } from 'react';
import { getStoredItems, updateStoredItem, saveOutfitToStorage } from '@/utils/storage';
import { generateOutfits } from '@/utils/recommendationEngine';
import OutfitCard from '@/components/OutfitCard';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';

export default function RecommendationsPage() {
  const [items, setItems] = useState([]);
  const [preferences, setPreferences] = useState({
    occasion: 'garba',
    vibe: 'any',
    formality: 3,
    weather: 'normal',
  });
  const [outfits, setOutfits] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const loaded = getStoredItems();
    setItems(loaded);
    // Generate initial recommendation set
    if (loaded.length > 0) {
      const generated = generateOutfits(loaded, preferences);
      setOutfits(generated);
    }
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateOutfits(items, preferences);
      setOutfits(generated);
      setIsGenerating(false);
      setToastMessage('GENERATED 3 STUNNING OUTFIT SUGGESTIONS!');
    }, 400);
  };

  const handleWearToday = (outfit) => {
    const nowIso = new Date().toISOString();
    outfit.items.forEach(item => {
      updateStoredItem(item.id, { lastWorn: nowIso });
    });
    setToastMessage('LOGGED TODAY OUTFIT! WARDROBE WEAR HISTORY UPDATED.');
  };

  const handleSaveOutfit = (outfit) => {
    saveOutfitToStorage(outfit);
    setToastMessage('OUTFIT SAVED TO YOUR FAVORITE LOOKS!');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}

      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col gap-2">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          THE &quot;I HAVE NOTHING TO WEAR&quot; ENGINE
        </span>
        <h1 className="text-3xl font-extrabold font-heading text-slate-100 uppercase tracking-tight">
          OUTFIT RECOMMENDATION GENERATOR
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Select your event, weather, and vibe preference. Our recommendation algorithm calculates color harmony, formality match, and wear frequency to build your perfect look.
        </p>
      </div>

      {/* Generator Preferences Panel */}
      <div className="glass-panel rounded-2xl p-6 lg:p-8 border border-amber-500/20 flex flex-col gap-6">
        {/* Occasion Presets */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">
            1. SELECT OCCASION OR FESTIVAL
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {[
              { id: 'garba', label: 'GARBA NIGHT' },
              { id: 'diwali', label: 'DIWALI PARTY' },
              { id: 'college', label: 'COLLEGE LECTURE' },
              { id: 'wedding', label: 'WEDDING / SANGEET' },
              { id: 'casual', label: 'CASUAL CAFE DATE' },
            ].map(occ => (
              <button
                key={occ.id}
                onClick={() => setPreferences({ ...preferences, occasion: occ.id })}
                className={`p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all ${
                  preferences.occasion === occ.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg font-black scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 border border-white/10 hover:bg-slate-800'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weather & Vibe & Formality Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-white/10">
          {/* Weather */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              2. WEATHER CONDITION
            </label>
            <select
              value={preferences.weather}
              onChange={(e) => setPreferences({ ...preferences, weather: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="normal">NORMAL / PLEASANT</option>
              <option value="hot">SUNNY / HOT (SUMMER)</option>
              <option value="chilly">CHILLY / WINTER</option>
              <option value="rainy">RAINY / MONSOON</option>
            </select>
          </div>

          {/* Style Vibe */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              3. STYLE VIBE
            </label>
            <select
              value={preferences.vibe}
              onChange={(e) => setPreferences({ ...preferences, vibe: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="any">ANY VIBE (AUTOMATIC)</option>
              <option value="traditional">TRADITIONAL ETHNIC</option>
              <option value="fusion">INDIE FUSION</option>
              <option value="chic">MODERN CHIC</option>
              <option value="minimal">MINIMALIST</option>
              <option value="boho">BOHO ETHNIC</option>
            </select>
          </div>

          {/* Formality Rating */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                4. FORMALITY RATING
              </label>
              <span className="text-xs font-black text-amber-400">
                {preferences.formality} / 5
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={preferences.formality}
              onChange={(e) => setPreferences({ ...preferences, formality: Number(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
              <span>CASUAL (1)</span>
              <span>FORMAL (5)</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
          >
            {isGenerating ? 'ANALYZING COLOR HARMONY...' : 'GENERATE OUTFITS NOW'}
          </button>
        </div>
      </div>

      {/* Generated Outfits Results */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-heading text-slate-100 uppercase tracking-wide">
            RECOMMENDED LOOKS ({outfits.length})
          </h2>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
            SCORED BY COLOR & FORMALITY
          </span>
        </div>

        {outfits.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {outfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                onWearToday={handleWearToday}
                onSaveOutfit={handleSaveOutfit}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Outfits Generated"
            description="We could not generate outfit combinations with your current preferences. Try adding more clothing items to your wardrobe."
            actionText="Add Clothes to Wardrobe"
            actionHref="/add-item"
          />
        )}
      </div>
    </div>
  );
}
