'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addStoredItem } from '@/utils/storage';
import Toast from '@/components/Toast';

export default function AddItemPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    category: 'top',
    subcategory: 'kurta',
    color: 'white',
    colorName: '',
    pattern: 'solid',
    fabric: 'cotton',
    occasion: ['college', 'casual'],
    season: 'all',
    vibe: 'traditional',
    formality: 3,
    size: 'M',
    brand: '',
    favorite: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Compressed Image Handler (Requirement #5)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('IMAGE FILE SIZE IS TOO LARGE (MAX 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Compress image using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const MAX_WIDTH = 600;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImagePreview(compressedDataUrl);
        setErrorMessage(null);
      };
    };
    reader.readAsDataURL(file);
  };

  const toggleOccasion = (occ) => {
    if (formData.occasion.includes(occ)) {
      setFormData({
        ...formData,
        occasion: formData.occasion.filter(o => o !== occ)
      });
    } else {
      setFormData({
        ...formData,
        occasion: [...formData.occasion, occ]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (Requirement #14)
    if (!formData.subcategory.trim()) {
      setErrorMessage('PLEASE PROVIDE A CLOTHING SUBCATEGORY (E.G. KURTA, JEANS, SAREE)');
      return;
    }
    if (formData.occasion.length === 0) {
      setErrorMessage('PLEASE SELECT AT LEAST ONE OCCASION OR FESTIVAL');
      return;
    }

    // Default SVG preview if no file selected
    const svgFallback = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><rect width="100%" height="100%" fill="#1e1b4b"/><text x="300" y="375" font-family="sans-serif" font-size="24" fill="#e0a96d" text-anchor="middle" font-weight="bold">${formData.subcategory.toUpperCase()}</text></svg>`;
    const finalImage = imagePreview || `data:image/svg+xml;utf8,${encodeURIComponent(svgFallback)}`;

    const newItem = {
      ...formData,
      imageUrl: finalImage,
      userId: 'test-user',
    };

    addStoredItem(newItem);
    setSuccessMessage('CLOTHING ITEM SUCCESSFULLY ADDED TO WARDROBE!');

    setTimeout(() => {
      router.push('/wardrobe');
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Toast Notification */}
      {successMessage && <Toast message={successMessage} type="success" onClose={() => setSuccessMessage(null)} />}
      {errorMessage && <Toast message={errorMessage} type="error" onClose={() => setErrorMessage(null)} />}

      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">WARDROBE MANAGEMENT</span>
        <h1 className="text-3xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mt-1">
          ADD NEW CLOTHING ITEM
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload a photo of your top, bottom, saree, or footwear, tag visual properties, and save it to your digital closet.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 lg:p-8 border border-white/10 flex flex-col gap-6">
        {/* Image Upload Area */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
            1. ITEM PHOTO UPLOAD
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-900 border border-dashed border-amber-500/40">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-32 h-40 object-cover rounded-xl border border-white/20 shadow-md"
              />
            ) : (
              <div className="w-32 h-40 rounded-xl bg-slate-950 border border-white/10 flex flex-col items-center justify-center text-center p-3">
                <span className="text-[10px] font-bold text-amber-400 uppercase">NO PHOTO</span>
                <span className="text-[9px] text-slate-500 mt-1">Compressed SVG fallback will be used if left blank</span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 file:cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 uppercase">
                AUTOMATIC COMPRESSION ENABLED (WEBP/JPEG OPTIMIZED)
              </span>
            </div>
          </div>
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              CATEGORY
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="top">TOP / KURTI / SHIRT</option>
              <option value="bottom">BOTTOM / JEANS / LEHENGA SKIRT</option>
              <option value="dress">DRESS / SAREE / ANARKALI</option>
              <option value="footwear">FOOTWEAR / KOLHAPURIS / HEELS</option>
              <option value="accessory">ACCESSORY / JHUMKAS / DUPATTA</option>
              <option value="outerwear">OUTERWEAR / JACKET / SH RUG</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              SUBCATEGORY NAME *
            </label>
            <input
              type="text"
              required
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              placeholder="e.g. Chikankari Kurta, Bandhani Dupatta, Silk Saree..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Visual Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              COLOR
            </label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="white">WHITE / IVORY</option>
              <option value="black">BLACK</option>
              <option value="red">RED / CRIMSON</option>
              <option value="blue">BLUE / INDIGO</option>
              <option value="yellow">YELLOW / MUSTARD</option>
              <option value="green">GREEN / EMERALD</option>
              <option value="purple">PURPLE / MAGENTA</option>
              <option value="pink">PINK / BLUSH</option>
              <option value="silver">SILVER / OXIDISED</option>
              <option value="gold">GOLD / BEIGE</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              FABRIC TYPE
            </label>
            <input
              type="text"
              value={formData.fabric}
              onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
              placeholder="Cotton, Silk, Denim, Chiffon..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              STYLE VIBE
            </label>
            <select
              value={formData.vibe}
              onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="traditional">TRADITIONAL ETHNIC</option>
              <option value="fusion">INDIE FUSION</option>
              <option value="chic">MODERN CHIC</option>
              <option value="minimal">MINIMALIST</option>
              <option value="boho">BOHO ETHNIC</option>
            </select>
          </div>
        </div>

        {/* Occasion Chips (Including Indian Festivals) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
            SUITABLE OCCASIONS / INDIAN FESTIVALS *
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'college', label: 'COLLEGE LECTURE' },
              { id: 'garba', label: 'GARBA / NAVRATRI' },
              { id: 'diwali', label: 'DIWALI FESTIVAL' },
              { id: 'wedding', label: 'WEDDING / SANGEET' },
              { id: 'puja', label: 'PUJA / FAMILY FUNCTION' },
              { id: 'casual', label: 'CASUAL HANGOUT' },
              { id: 'date', label: 'DATE NIGHT' },
              { id: 'party', label: 'PARTY' },
            ].map(occ => (
              <button
                type="button"
                key={occ.id}
                onClick={() => toggleOccasion(occ.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  formData.occasion.includes(occ.id)
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>

        {/* Formality Slider */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              FORMALITY LEVEL (1 VERY CASUAL TO 5 HEAVY FORMAL)
            </label>
            <span className="text-xs font-black text-amber-400">{formData.formality} / 5</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={formData.formality}
            onChange={(e) => setFormData({ ...formData, formality: Number(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/wardrobe')}
            className="px-5 py-2.5 rounded-xl border border-white/20 text-slate-300 hover:text-white text-xs font-bold uppercase"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 text-xs font-black uppercase tracking-widest shadow-lg"
          >
            SAVE CLOTHING ITEM
          </button>
        </div>
      </form>
    </div>
  );
}
