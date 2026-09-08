'use client';

import React, { useState, useEffect } from 'react';
import { getStoredItems, resetWardrobeToSample } from '@/utils/storage';
import ItemCard from '@/components/ItemCard';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';

export default function WardrobePage() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    setItems(getStoredItems());
  }, []);

  const handleToggleFavorite = (id) => {
    const updated = items.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item);
    setItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grwm_wardrobe_items_v1', JSON.stringify(updated));
    }
    setToastMessage('FAVORITE STATUS UPDATED');
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grwm_wardrobe_items_v1', JSON.stringify(updated));
    }
    setToastMessage('ITEM REMOVED FROM WARDROBE');
  };

  const handleResetSample = () => {
    const reloaded = resetWardrobeToSample();
    setItems(reloaded);
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setSearchQuery('');
    setFavoritesOnly(false);
    setToastMessage('WARDROBE RESET TO SAMPLE CLOTHES');
  };

  // Filtering math
  const filteredItems = items.filter(item => {
    // Search check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchSub = item.subcategory?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      const matchColor = item.color?.toLowerCase().includes(q) || item.colorName?.toLowerCase().includes(q);
      const matchFabric = item.fabric?.toLowerCase().includes(q);
      const matchBrand = item.brand?.toLowerCase().includes(q);
      if (!matchSub && !matchCat && !matchColor && !matchFabric && !matchBrand) return false;
    }

    // Category check
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'ethnic') {
        const isEthnic = ['saree', 'kurta', 'anarkali', 'lehenga skirt', 'choli', 'jhumkas', 'kolhapuris'].includes(item.subcategory);
        if (!isEthnic && item.category !== 'dress') return false;
      } else if (item.category !== selectedCategory) {
        return false;
      }
    }

    // Occasion check
    if (selectedOccasion !== 'all') {
      if (!item.occasion || !item.occasion.includes(selectedOccasion)) return false;
    }

    // Favorites check
    if (favoritesOnly && !item.favorite) return false;

    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}

      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">DIGITAL CLOSET</span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mt-1">
            MY WARDROBE <span className="text-amber-500 font-normal">({filteredItems.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse, search, and filter your tops, bottoms, festive sarees, and accessories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
              favoritesOnly
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg'
                : 'border-white/20 text-slate-300 hover:border-amber-400/40'
            }`}
          >
            {favoritesOnly ? 'SHOWING FAVORITES ONLY' : 'FILTER FAVORITES'}
          </button>
          <button
            onClick={handleResetSample}
            className="px-4 py-2 rounded-xl border border-white/15 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider"
          >
            RESTORE SAMPLES
          </button>
        </div>
      </div>

      {/* Search & Filter Drawer Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col gap-5">
        {/* Search Bar */}
        <div className="w-full">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            SEARCH CLOTHES BY COLOR, FABRIC, BRAND OR SUBCATEGORY
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type 'Chikankari', 'Denim', 'Kurta', 'Saree', 'Silver'..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            CLOTHING CATEGORY
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'ALL CLOTHES' },
              { id: 'top', label: 'TOPS & KORTIS' },
              { id: 'bottom', label: 'BOTTOMS & JEANS' },
              { id: 'ethnic', label: 'INDIAN ETHNIC WEAR' },
              { id: 'footwear', label: 'FOOTWEAR' },
              { id: 'accessory', label: 'ACCESSORIES & JHUMKAS' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Indian Festival Occasion Tags */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            FILTER BY OCCASION / FESTIVAL
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'ALL OCCASIONS' },
              { id: 'garba', label: 'GARBA / NAVRATRI' },
              { id: 'diwali', label: 'DIWALI' },
              { id: 'college', label: 'COLLEGE' },
              { id: 'wedding', label: 'WEDDING / SANGEET' },
              { id: 'casual', label: 'CASUAL' },
            ].map(occ => (
              <button
                key={occ.id}
                onClick={() => setSelectedOccasion(occ.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedOccasion === occ.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wardrobe Items Grid OR Empty State (Requirement #11) */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={(selected) => setSelectedItem(selected)}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matching Wardrobe Items"
          description="We couldn't find any clothing items matching your current category, festival filter, or search keywords."
          actionText="Add New Clothing Item"
          actionHref="/add-item"
          onReset={() => {
            setSelectedCategory('all');
            setSelectedOccasion('all');
            setSearchQuery('');
            setFavoritesOnly(false);
          }}
        />
      )}

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

            <div className="border-t border-white/10 pt-3 flex items-center justify-between">
              <button
                onClick={() => {
                  handleDeleteItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 rounded-xl border border-rose-500/40 text-rose-400 text-xs font-bold uppercase"
              >
                DELETE ITEM
              </button>
              <button
                onClick={() => {
                  handleToggleFavorite(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase"
              >
                {selectedItem.favorite ? 'UNFAVORITE' : 'MARK FAVORITE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
