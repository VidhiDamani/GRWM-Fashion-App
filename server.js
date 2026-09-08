const http = require('http');
const PORT = 3000;

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="GRWM - your personal Indian fashion wardrobe app. Get outfit suggestions for college, Diwali, Garba, weddings and more." />
  <title>GRWM - Your Personal Style Companion</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f9a8d4'/><text y='.9em' font-size='60' text-anchor='middle' x='50' font-family='Georgia' fill='%23be185d'>G</text></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #fff7f9;
      --bg-card: #ffffff;
      --pink-100: #fce7f3;
      --pink-200: #fbcfe8;
      --pink-400: #f472b6;
      --pink-500: #ec4899;
      --pink-600: #db2777;
      --pink-700: #be185d;
      --text: #1a1a2e;
      --text-muted: #6b7280;
      --text-light: #9ca3af;
      --border: #f3e8ee;
      --border-strong: #fce7f3;
      --radius: 16px;
      --radius-sm: 10px;
      --shadow: 0 2px 16px rgba(236, 72, 153, 0.06);
      --shadow-hover: 0 8px 32px rgba(236, 72, 153, 0.14);
    }

    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, .serif { font-family: 'Cormorant Garamond', serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--pink-200); border-radius: 99px; }

    /* Nav */
    .nav {
      position: sticky; top: 0; z-index: 40;
      background: rgba(255, 247, 249, 0.9);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 0 24px;
      height: 64px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      display: flex; align-items: center; gap: 10px; cursor: pointer;
      text-decoration: none;
    }
    .nav-logo-mark {
      width: 36px; height: 36px; border-radius: 10px;
      background: linear-gradient(135deg, #f9a8d4, #ec4899);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; font-weight: 600; color: white;
    }
    .nav-logo-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; font-weight: 600; color: var(--text); letter-spacing: 0.02em;
    }
    .nav-links { display: flex; align-items: center; gap: 4px; }
    .nav-link {
      padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 500;
      color: var(--text-muted); cursor: pointer; border: none; background: none;
      transition: all 0.15s ease;
    }
    .nav-link:hover { color: var(--pink-600); background: var(--pink-100); }
    .nav-link.active { color: var(--pink-600); background: var(--pink-100); font-weight: 600; }
    .btn-primary {
      padding: 10px 20px; background: var(--pink-500); color: white;
      border-radius: 99px; font-size: 13px; font-weight: 600;
      border: none; cursor: pointer; transition: all 0.2s;
    }
    .btn-primary:hover { background: var(--pink-600); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(236,72,153,0.3); }
    .btn-secondary {
      padding: 10px 20px; background: white; color: var(--text);
      border-radius: 99px; font-size: 13px; font-weight: 500;
      border: 1.5px solid var(--border-strong); cursor: pointer; transition: all 0.15s;
    }
    .btn-secondary:hover { border-color: var(--pink-400); color: var(--pink-600); }

    /* Mobile menu btn */
    .menu-btn {
      display: none; padding: 8px 14px; border-radius: 8px; font-size: 12px;
      font-weight: 600; color: var(--pink-600); background: var(--pink-100);
      border: none; cursor: pointer; letter-spacing: 0.05em;
    }

    /* Card */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }
    .card-hover { transition: all 0.2s; }
    .card-hover:hover { box-shadow: var(--shadow-hover); transform: translateY(-3px); }

    /* Pill badges */
    .pill {
      display: inline-flex; align-items: center;
      padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 600;
      letter-spacing: 0.04em;
    }
    .pill-pink { background: var(--pink-100); color: var(--pink-700); }
    .pill-green { background: #d1fae5; color: #065f46; }
    .pill-soft { background: #f3f4f6; color: #4b5563; }

    /* Filter chips */
    .chip {
      padding: 7px 16px; border-radius: 99px; font-size: 12px; font-weight: 500;
      border: 1.5px solid var(--border-strong); color: var(--text-muted);
      background: white; cursor: pointer; transition: all 0.15s;
    }
    .chip:hover { border-color: var(--pink-300); color: var(--pink-600); }
    .chip.active {
      background: var(--pink-500); color: white; border-color: var(--pink-500);
      font-weight: 600;
    }

    /* Input */
    .input {
      width: 100%; padding: 11px 16px; border-radius: var(--radius-sm);
      border: 1.5px solid var(--border-strong); background: white; color: var(--text);
      font-size: 14px; font-family: 'Inter', sans-serif; outline: none;
      transition: border-color 0.15s;
    }
    .input:focus { border-color: var(--pink-400); }
    .label {
      font-size: 11px; font-weight: 600; color: var(--text-muted);
      letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px;
      display: block;
    }

    /* Section layout */
    .page { max-width: 1120px; margin: 0 auto; padding: 40px 24px; }
    .page-header { margin-bottom: 32px; }
    .page-title { font-size: 40px; font-weight: 500; color: var(--text); line-height: 1.15; }
    .page-title .accent { color: var(--pink-500); font-style: italic; }
    .page-subtitle { font-size: 14px; color: var(--text-muted); margin-top: 8px; line-height: 1.6; }

    /* Item grid */
    .item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }

    /* Wardrobe item card */
    .item-card { cursor: pointer; overflow: hidden; }
    .item-card-img {
      width: 100%; aspect-ratio: 3/4; object-fit: cover; background: var(--pink-100);
      display: flex; align-items: center; justify-content: center;
    }
    .item-card-body { padding: 14px 16px; }
    .item-card-cat { font-size: 10px; font-weight: 600; color: var(--pink-500); letter-spacing: 0.08em; text-transform: uppercase; }
    .item-card-name { font-size: 15px; font-weight: 500; color: var(--text); margin: 3px 0; }
    .item-card-meta { font-size: 12px; color: var(--text-light); }
    .item-card-actions { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-top: 1px solid var(--border); }
    .item-card-fav { font-size: 11px; font-weight: 600; color: var(--pink-500); cursor: pointer; background: none; border: none; }
    .item-card-del { font-size: 11px; font-weight: 600; color: #ef4444; cursor: pointer; background: none; border: none; }

    /* Outfit reco card */
    .outfit-card { padding: 28px; margin-bottom: 20px; }
    .outfit-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
    .outfit-card-title { font-size: 26px; font-weight: 500; }
    .outfit-items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; margin-bottom: 20px; }
    .outfit-item-mini { border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border); background: var(--bg); }
    .outfit-item-mini img { width: 100%; aspect-ratio: 1; object-fit: cover; }
    .outfit-item-mini-label { padding: 8px 10px; }

    /* Stats row */
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
    .stat-card { padding: 20px 22px; text-align: left; }
    .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 500; color: var(--pink-600); line-height: 1; }
    .stat-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; font-weight: 500; }

    /* Hero */
    .hero { border-radius: 24px; background: linear-gradient(135deg, #fff0f6 0%, #fce7f3 60%, #fdf2f8 100%); padding: 56px 48px; position: relative; overflow: hidden; margin-bottom: 32px; }
    .hero::before { content: ''; position: absolute; top: -60px; right: -60px; width: 300px; height: 300px; border-radius: 50%; background: rgba(244, 114, 182, 0.12); }
    .hero-title { font-size: clamp(32px, 5vw, 52px); font-weight: 500; color: var(--text); line-height: 1.15; }
    .hero-title .italic { font-style: italic; color: var(--pink-600); }
    .hero-sub { font-size: 15px; color: var(--text-muted); max-width: 480px; margin: 16px 0 28px; line-height: 1.65; }
    .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }

    /* Toast */
    .toast-wrap { position: fixed; bottom: 24px; right: 24px; z-index: 99; max-width: 340px; animation: slideUp 0.25s ease; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .toast { padding: 14px 18px; border-radius: 12px; font-size: 13px; font-weight: 500; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
    .toast-success { background: white; color: #065f46; border: 1.5px solid #a7f3d0; }
    .toast-error { background: white; color: #991b1b; border: 1.5px solid #fecaca; }
    .toast-close { font-size: 11px; font-weight: 700; cursor: pointer; background: none; border: none; color: inherit; opacity: 0.6; }

    /* Empty state */
    .empty-state { text-align: center; padding: 72px 24px; }
    .empty-badge { display: inline-block; padding: 6px 16px; border-radius: 99px; background: var(--pink-100); color: var(--pink-600); font-size: 11px; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 16px; }
    .empty-title { font-size: 28px; font-weight: 500; color: var(--text); margin-bottom: 10px; }
    .empty-desc { font-size: 14px; color: var(--text-muted); max-width: 380px; margin: 0 auto 24px; line-height: 1.6; }

    /* Trip checklist item */
    .pack-item { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: var(--radius-sm); background: white; border: 1.5px solid var(--border); cursor: pointer; transition: all 0.15s; margin-bottom: 10px; }
    .pack-item.checked { opacity: 0.6; border-color: #a7f3d0; background: #f0fdf4; }
    .pack-check { width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--pink-300); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: white; background: transparent; transition: all 0.15s; }
    .pack-check.done { background: #10b981; border-color: #10b981; }

    /* 404 */
    .page-404 { text-align: center; padding: 100px 24px; }
    .error-num { font-family: 'Cormorant Garamond', serif; font-size: 120px; color: var(--pink-200); line-height: 1; }

    /* Mobile drawer */
    .drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 49; }
    .drawer { position: fixed; right: 0; top: 0; bottom: 0; width: 280px; background: white; z-index: 50; padding: 24px; display: flex; flex-direction: column; box-shadow: -8px 0 40px rgba(0,0,0,0.1); }
    .drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
    .drawer-link { display: block; padding: 13px 16px; border-radius: 10px; font-size: 14px; font-weight: 500; color: var(--text-muted); cursor: pointer; border: none; background: none; text-align: left; width: 100%; margin-bottom: 4px; transition: all 0.12s; }
    .drawer-link:hover { background: var(--pink-100); color: var(--pink-700); }
    .drawer-link.active { background: var(--pink-100); color: var(--pink-700); font-weight: 600; }
    .drawer-contact { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border); }

    /* Form section */
    .form-section { max-width: 640px; }
    .form-group { margin-bottom: 20px; }
    select.input { appearance: none; cursor: pointer; }

    /* Range slider */
    input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 99px; background: var(--pink-200); outline: none; cursor: pointer; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--pink-500); cursor: pointer; border: 3px solid white; box-shadow: 0 2px 8px rgba(236,72,153,0.3); }

    /* Occasion tags in add-item */
    .occ-tag { padding: 7px 14px; border-radius: 99px; font-size: 12px; font-weight: 500; border: 1.5px solid var(--border-strong); color: var(--text-muted); background: white; cursor: pointer; transition: all 0.12s; }
    .occ-tag.active { background: var(--pink-500); color: white; border-color: var(--pink-500); }

    /* Match bar */
    .match-bar-bg { width: 100%; height: 6px; background: #f3e8ee; border-radius: 99px; }
    .match-bar-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--pink-400), var(--pink-600)); transition: width 0.4s ease; }

    /* Progress bar */
    .progress-bg { width: 100%; height: 8px; background: var(--pink-100); border-radius: 99px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, var(--pink-400), var(--pink-500)); border-radius: 99px; transition: width 0.3s; }

    @media (max-width: 768px) {
      .nav-links, .nav-right-desktop { display: none !important; }
      .menu-btn { display: block !important; }
      .stats-row { grid-template-columns: repeat(2, 1fr); }
      .item-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
      .hero { padding: 36px 24px; }
      .hero-title { font-size: 30px; }
      .page { padding: 28px 16px; }
      .outfit-items-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 480px) {
      .item-grid { grid-template-columns: 1fr 1fr; }
      .stats-row { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>
<div id="root"></div>

<script type="text/babel">
const { useState, useEffect, useRef } = React;

// --- Data helpers ---
const makeGarmentSvg = (name, cat, c1, c2, accent) => {
  const shapes = {
    top: '<path d="M140 160 Q160 130 200 125 Q240 130 260 160 L270 240 L260 240 L260 320 L140 320 L140 240 L130 240 Z" fill="' + accent + '" opacity="0.6"/><path d="M200 125 Q220 115 250 125 L270 160 L260 160 L260 240 L140 240 L140 160 L130 160 L150 125 Q180 115 200 125Z" fill="' + accent + '" opacity="0.9"/>',
    bottom: '<path d="M145 160 L155 330 L185 330 L200 250 L215 330 L245 330 L255 160Z" fill="' + accent + '" opacity="0.85"/><ellipse cx="200" cy="162" rx="55" ry="10" fill="' + accent + '"/>',
    dress: '<path d="M160 130 Q180 120 200 118 Q220 120 240 130 L260 200 L280 400 L120 400 L140 200Z" fill="' + accent + '" opacity="0.8"/><path d="M200 118 Q220 110 245 122 L260 180 L240 180 L240 200 L160 200 L160 180 L140 180 L155 122 Q175 108 200 118Z" fill="' + accent + '" opacity="0.95"/>',
    footwear: '<ellipse cx="200" cy="300" rx="90" ry="20" fill="' + accent + '" opacity="0.3"/><path d="M130 270 Q160 240 200 235 Q240 240 270 270 L275 310 Q240 330 200 332 Q160 330 125 310Z" fill="' + accent + '" opacity="0.85"/><rect x="185" y="210" width="30" height="80" rx="6" fill="' + accent + '" opacity="0.7"/>',
    accessory: '<circle cx="200" cy="200" r="55" fill="none" stroke="' + accent + '" stroke-width="8" opacity="0.7"/><path d="M175 255 L160 320 M200 260 L200 330 M225 255 L240 320" stroke="' + accent + '" stroke-width="6" stroke-linecap="round" opacity="0.8"/><circle cx="200" cy="200" r="20" fill="' + accent + '" opacity="0.9"/>',
  };
  const shape = shapes[cat] || shapes.top;
  const id = 'bg' + name.replace(/\\s/g,'').slice(0,6);
  const s = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520">'
    + '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">'
    + '<stop offset="0%" stop-color="' + c1 + '"/>'
    + '<stop offset="100%" stop-color="' + c2 + '"/>'
    + '</linearGradient></defs>'
    + '<rect width="400" height="520" fill="url(#' + id + ')"/>'
    + '<rect x="20" y="20" width="360" height="480" rx="16" fill="rgba(255,255,255,0.12)"/>'
    + shape
    + '<text x="200" y="440" font-family="Georgia,serif" font-size="13" fill="rgba(255,255,255,0.65)" text-anchor="middle" letter-spacing="2">' + name.toUpperCase() + '</text>'
    + '<text x="200" y="462" font-family="Georgia,serif" font-size="11" fill="rgba(255,255,255,0.45)" text-anchor="middle">' + cat + '</text>'
    + '</svg>';
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(s);
};

const SEED_ITEMS = [
  { id:'s1', category:'top', subcategory:'Chikankari Kurta', color:'white', colorName:'Ivory White', fabric:'Cotton', occasion:['college','puja','casual'], vibe:'traditional', formality:3, favorite:true, size:'M', brand:'FabIndia', imageUrl: makeGarmentSvg('Chikankari Kurta','top','#ede9fe','#c4b5fd','#8b5cf6') },
  { id:'s2', category:'bottom', subcategory:'Wide-Leg Jeans', color:'indigo', colorName:'Deep Indigo', fabric:'Denim', occasion:['college','casual','date'], vibe:'chic', formality:2, favorite:true, size:'28', brand:"Levi's", imageUrl: makeGarmentSvg('Wide-Leg Jeans','bottom','#dbeafe','#93c5fd','#3b82f6') },
  { id:'s3', category:'top', subcategory:'Chaniya Choli Top', color:'yellow', colorName:'Mustard Yellow', fabric:'Cotton', occasion:['garba','diwali'], vibe:'traditional', formality:4, favorite:true, size:'M', brand:'Biba', imageUrl: makeGarmentSvg('Chaniya Choli','top','#fef9c3','#fde047','#ca8a04') },
  { id:'s4', category:'bottom', subcategory:'Bandhani Lehenga', color:'green', colorName:'Emerald Green', fabric:'Silk Chiffon', occasion:['garba','wedding','diwali'], vibe:'traditional', formality:5, favorite:false, size:'Free', brand:'Global Desi', imageUrl: makeGarmentSvg('Bandhani Lehenga','bottom','#d1fae5','#6ee7b7','#059669') },
  { id:'s5', category:'dress', subcategory:'Kanjeevaram Saree', color:'purple', colorName:'Royal Plum', fabric:'Silk', occasion:['wedding','diwali','puja'], vibe:'traditional', formality:5, favorite:true, size:'Unstitched', brand:'Nalli', imageUrl: makeGarmentSvg('Kanjeevaram Saree','dress','#fae8ff','#e879f9','#a21caf') },
  { id:'s6', category:'accessory', subcategory:'Oxidised Jhumkas', color:'silver', colorName:'Antique Silver', fabric:'Metal Alloy', occasion:['garba','diwali','college','wedding'], vibe:'boho', formality:3, favorite:true, size:'One Size', brand:'Tribe Amrapali', imageUrl: makeGarmentSvg('Oxidised Jhumkas','accessory','#f1f5f9','#cbd5e1','#64748b') },
  { id:'s7', category:'footwear', subcategory:'Kolhapuri Chappals', color:'tan', colorName:'Tan Brown', fabric:'Leather', occasion:['college','garba','casual'], vibe:'ethnic', formality:3, favorite:true, size:'38', brand:'Needledust', imageUrl: makeGarmentSvg('Kolhapuri Chappals','footwear','#fef3c7','#fcd34d','#d97706') },
  { id:'s8', category:'top', subcategory:'Ribbed Crop Top', color:'olive', colorName:'Olive Green', fabric:'Cotton Elastane', occasion:['college','casual','date'], vibe:'minimal', formality:2, favorite:false, size:'S', brand:'Zara', imageUrl: makeGarmentSvg('Ribbed Crop Top','top','#dcfce7','#86efac','#16a34a') },
  { id:'s9', category:'dress', subcategory:'Anarkali Suit', color:'red', colorName:'Ruby Crimson', fabric:'Chiffon Silk', occasion:['diwali','wedding','puja'], vibe:'traditional', formality:4, favorite:true, size:'M', brand:'Anita Dongre', imageUrl: makeGarmentSvg('Anarkali Suit','dress','#ffe4e6','#fda4af','#e11d48') },
  { id:'s10', category:'footwear', subcategory:'Block Heel Sandals', color:'beige', colorName:'Nude Beige', fabric:'Faux Suede', occasion:['party','wedding','date','college'], vibe:'chic', formality:4, favorite:false, size:'38', brand:'H&M', imageUrl: makeGarmentSvg('Block Heel Sandals','footwear','#fef9c3','#fde68a','#b45309') },
];

const getItems = () => {
  try {
    const d = localStorage.getItem('sm_v3');
    return d ? JSON.parse(d) : SEED_ITEMS;
  } catch { return SEED_ITEMS; }
};
const saveItems = (items) => { try { localStorage.setItem('sm_v3', JSON.stringify(items)); } catch {} };


// --- Mini components ---

function Toast({ msg, type, onClose }) {
  if (!msg) return null;
  return (
    <div className="toast-wrap">
      <div className={\`toast \${type === 'error' ? 'toast-error' : 'toast-success'}\`}>
        <span>{msg}</span>
        <button className="toast-close" onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );
}

function EmptyState({ title, desc, cta, onCta, onReset }) {
  return (
    <div className="empty-state">
      <div className="empty-badge">Nothing here</div>
      <div className="empty-title serif">{title}</div>
      <p className="empty-desc">{desc}</p>
      <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
        {onReset && <button className="btn-secondary" onClick={onReset}>Clear filters</button>}
        {cta && <button className="btn-primary" onClick={onCta}>{cta}</button>}
      </div>
    </div>
  );
}

// --- Main App ---
function App() {
  const [route, setRoute] = useState('home');
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Wardrobe state
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [occFilter, setOccFilter] = useState('all');

  // Recommendation state
  const [recOcc, setRecOcc] = useState('garba');
  const [recWeather, setRecWeather] = useState('normal');
  const [recFormality, setRecFormality] = useState(3);
  const [recOutfits, setRecOutfits] = useState([]);
  const [generating, setGenerating] = useState(false);

  // Add item form
  const [form, setForm] = useState({ category:'top', subcategory:'', color:'', fabric:'cotton', occasion:['college'], formality:2 });
  const [imgPreview, setImgPreview] = useState(null);
  const [formErr, setFormErr] = useState('');

  // Trip planner
  const [tripName, setTripName] = useState('Jaipur Wedding');
  const [tripDays, setTripDays] = useState(3);
  const [tripOcc, setTripOcc] = useState('wedding');
  const [packList, setPackList] = useState([]);
  const [checked, setChecked] = useState({});

  useEffect(() => { setItems(getItems()); }, []);

  const notify = (msg, type='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const go = (r) => { setRoute(r); setDrawerOpen(false); window.scrollTo(0,0); };

  // Wardrobe actions
  const toggleFav = (id) => {
    const updated = items.map(i => i.id === id ? {...i, favorite: !i.favorite} : i);
    setItems(updated); saveItems(updated);
    notify('Favorite updated');
  };
  const deleteItem = (id) => {
    if (!window.confirm('Remove this item from your wardrobe?')) return;
    const updated = items.filter(i => i.id !== id);
    setItems(updated); saveItems(updated);
    notify('Item removed from wardrobe');
  };

  // Image compression
  const handleImg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 6 * 1024 * 1024) { setFormErr('Image too large. Please use a photo under 6 MB.'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.src = ev.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 640; const scale = Math.min(MAX / img.width, 1);
        canvas.width = img.width * scale; canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        setImgPreview(canvas.toDataURL('image/jpeg', 0.82));
        setFormErr('');
      };
    };
    reader.readAsDataURL(file);
  };

  // Add item submit
  const submitItem = (e) => {
    e.preventDefault();
    if (!form.subcategory.trim()) { setFormErr('Please enter the item name.'); return; }
    if (form.occasion.length === 0) { setFormErr('Select at least one occasion.'); return; }
    setFormErr('');
    const img = imgPreview || makeGarmentSvg(form.subcategory || 'New item', form.category, '#fce7f3', '#fbcfe8', '#ec4899');
    const item = { ...form, id: 'i' + Date.now(), imageUrl: img, favorite: false, size: 'M', brand: '', colorName: form.color };
    const updated = [item, ...items];
    setItems(updated); saveItems(updated);
    notify('New item added to your wardrobe!');
    setForm({ category:'top', subcategory:'', color:'', fabric:'cotton', occasion:['college'], formality:2 });
    setImgPreview(null);
    go('wardrobe');
  };

  // Toggle occasion in form
  const toggleOcc = (o) => {
    setForm(f => ({
      ...f,
      occasion: f.occasion.includes(o) ? f.occasion.filter(x => x !== o) : [...f.occasion, o]
    }));
  };

  // Outfit generation
  const generateOutfits = () => {
    setGenerating(true);
    setTimeout(() => {
      const pool = items.length >= 3 ? items : SEED_ITEMS;
      const byOcc = pool.filter(i => i.occasion?.includes(recOcc));
      const final = byOcc.length >= 2 ? byOcc : pool;

      const scoreFn = (i) => {
        let s = 10;
        if (i.occasion?.includes(recOcc)) s += 10;
        if (Math.abs(i.formality - recFormality) <= 1) s += 5;
        if (i.favorite) s += 3;
        return s;
      };

      const scored = final.map(i => ({...i, _score: scoreFn(i)})).sort((a,b) => b._score - a._score);
      const tops = scored.filter(i => i.category==='top');
      const btms = scored.filter(i => i.category==='bottom');
      const dresses = scored.filter(i => i.category==='dress');
      const shoes = scored.filter(i => i.category==='footwear');
      const accs = scored.filter(i => i.category==='accessory');

      const results = [];
      const labels = ['Perfect Match', 'Alternative Look', 'Casual Twist'];
      const tags = [
        recOcc.charAt(0).toUpperCase() + recOcc.slice(1) + ' Special',
        'Festive Statement',
        'Everyday Elegance'
      ];

      if (dresses.length) {
        const clothings = [dresses[0]];
        if (accs[0]) clothings.push(accs[0]);
        if (shoes[0]) clothings.push(shoes[0]);
        results.push({ id:'o1', label: labels[0], tag: tags[0], items: clothings, match: 97 });
      }
      if (tops.length && btms.length) {
        const clothings = [tops[0], btms[0]];
        if (accs[0]) clothings.push(accs[0]);
        if (shoes[0]) clothings.push(shoes[0]);
        results.push({ id:'o2', label: labels[1], tag: tags[1], items: clothings, match: 93 });
      }
      if (tops.length > 1 && btms.length > 1) {
        const clothings = [tops[1], btms[1]];
        if (shoes[1] || shoes[0]) clothings.push(shoes[1] || shoes[0]);
        results.push({ id:'o3', label: labels[2], tag: tags[2], items: clothings, match: 88 });
      }

      setRecOutfits(results.slice(0, 3));
      setGenerating(false);
      if (results.length > 0) notify('Outfits generated for you!');
    }, 600);
  };

  // Trip planner
  const generatePack = (e) => {
    e?.preventDefault();
    const pool = items.length >= 3 ? items : SEED_ITEMS;
    const byOcc = pool.filter(i => i.occasion?.includes(tripOcc));
    const selected = new Map();
    byOcc.slice(0, tripDays + 2).forEach(i => selected.set(i.id, {...i, packReason:'Festive outfit'}));
    pool.filter(i => i.category==='footwear').slice(0,2).forEach(i => selected.set(i.id, {...i, packReason:'Footwear'}));
    pool.filter(i => i.category==='accessory').slice(0,2).forEach(i => selected.set(i.id, {...i, packReason:'Accessory'}));
    pool.filter(i => i.category==='top' && !selected.has(i.id)).slice(0, Math.min(tripDays, 2)).forEach(i => selected.set(i.id, {...i, packReason:'Casual top'}));
    setPackList(Array.from(selected.values()));
    setChecked({});
    notify(\`Packing list ready for your \${tripDays}-day trip!\`);
  };

  // Filtered wardrobe
  const shown = items.filter(i => {
    if (search && !i.subcategory?.toLowerCase().includes(search.toLowerCase()) && !i.color?.toLowerCase().includes(search.toLowerCase()) && !i.brand?.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter !== 'all' && i.category !== catFilter) return false;
    if (occFilter !== 'all' && (!i.occasion || !i.occasion.includes(occFilter))) return false;
    return true;
  });

  const checked_count = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <div className="drawer">
            <div className="drawer-header">
              <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,fontWeight:600}}>GRWM</span>
              <button className="btn-secondary" style={{padding:'6px 14px',fontSize:12}} onClick={() => setDrawerOpen(false)}>Close</button>
            </div>
            {[['home','Home'],['wardrobe','My Wardrobe'],['recommendations','Suggest Outfit'],['trip','Trip Planner'],['add','Add Item'],['404','404 Page']].map(([r,l]) => (
              <button key={r} className={'drawer-link ' + (route===r?'active':'')} onClick={() => go(r)}>{l}</button>
            ))}
            <div className="drawer-contact">
              <div style={{fontSize:11,fontWeight:600,color:'var(--text-light)',letterSpacing:'0.06em',marginBottom:8}}>CONTACT</div>
              <a href="mailto:support@grwm.app" style={{display:'block',fontSize:13,color:'var(--pink-600)',fontWeight:500,marginBottom:6}}>support@grwm.app</a>
              <a href="tel:+919876543210" style={{display:'block',fontSize:13,color:'var(--text-muted)'}}>+91 98765 43210</a>
            </div>
          </div>
        </>
      )}

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => go('home')}>
          <div className="nav-logo-mark">G</div>
          <span className="nav-logo-name">GRWM</span>
        </div>
        <div className="nav-links">
          {[['home','Home'],['wardrobe','My Wardrobe'],['recommendations','Suggest Outfit'],['trip','Trip Planner']].map(([r,l]) => (
            <button key={r} className={'nav-link ' + (route===r?'active':'')} onClick={() => go(r)}>{l}</button>
          ))}
        </div>
        <div className="nav-right-desktop" style={{display:'flex',alignItems:'center',gap:12}}>
          <a href="mailto:support@grwm.app" style={{fontSize:13,color:'var(--text-muted)',textDecoration:'none'}}>support@grwm.app</a>
          <button className="btn-primary" onClick={() => go('add')}>Add Item</button>
        </div>
        <button className="menu-btn" onClick={() => setDrawerOpen(true)}>Menu</button>
      </nav>

      {/* Pages */}
      <main style={{flex:1}}>

        {/* HOME */}
        {route === 'home' && (
          <div className="page">
            <div className="hero">
              <div className="pill pill-pink" style={{marginBottom:20,display:'inline-flex'}}>Indian College Fashion App</div>
              <h1 className="hero-title">
                Your <span className="italic">personal</span> wardrobe<br/>& outfit stylist
              </h1>
              <p className="hero-sub">
                Stop staring at your closet. GRWM organises your clothes and curates perfect outfits for college, Diwali, Garba nights, weddings, and more.
              </p>
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => go('recommendations')}>I have nothing to wear</button>
                <button className="btn-secondary" onClick={() => go('wardrobe')}>Browse wardrobe ({items.length})</button>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="card stat-card">
                <div className="stat-num">{items.length}</div>
                <div className="stat-label">Clothing items</div>
              </div>
              <div className="card stat-card">
                <div className="stat-num" style={{color:'#db2777'}}>{items.filter(i=>i.favorite).length}</div>
                <div className="stat-label">Saved favourites</div>
              </div>
              <div className="card stat-card">
                <div className="stat-num" style={{color:'#059669'}}>{items.filter(i=>['saree','kurta','lehenga skirt','anarkali suit','chaniya choli top'].some(s=>i.subcategory?.toLowerCase().includes(s))).length}</div>
                <div className="stat-label">Festive pieces</div>
              </div>
              <div className="card stat-card">
                <div className="stat-num" style={{color:'#7c3aed'}}>{Math.max(18, items.length * 3)}</div>
                <div className="stat-label">Possible outfits</div>
              </div>
            </div>

            {/* Quick occasions */}
            <div style={{marginBottom:12}}>
              <div className="pill pill-pink" style={{marginBottom:12}}>Occasions</div>
              <h2 className="serif" style={{fontSize:28,fontWeight:500,marginBottom:8}}>What are you dressing for?</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:14,marginBottom:40}}>
              {[
                {name:'Garba Night',sub:'Navratri chaniya choli & jhumkas',occ:'garba'},
                {name:'Diwali Party',sub:'Silk anarkalis & festive sarees',occ:'diwali'},
                {name:'College Lecture',sub:'Comfy kurtas & wide-leg jeans',occ:'college'},
                {name:'Wedding Sangeet',sub:'Lehengas & embroidered sets',occ:'wedding'},
                {name:'Cafe Date',sub:'Crop tops & minimal accessories',occ:'casual'},
              ].map((ev,i) => (
                <div key={i} className="card card-hover" style={{padding:20,cursor:'pointer'}} onClick={() => { setRecOcc(ev.occ); go('recommendations'); }}>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:4}}>{ev.name}</div>
                  <div style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.5,marginBottom:12}}>{ev.sub}</div>
                  <div style={{fontSize:11,fontWeight:600,color:'var(--pink-500)'}}>Generate outfit &rarr;</div>
                </div>
              ))}
            </div>

            {/* Recent items */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <h2 className="serif" style={{fontSize:26,fontWeight:500}}>Recent items</h2>
              <button className="btn-secondary" style={{fontSize:12,padding:'7px 16px'}} onClick={() => go('wardrobe')}>View all &rarr;</button>
            </div>
            <div className="item-grid">
              {items.slice(0,4).map(item => (
                <ItemCard key={item.id} item={item} onFav={toggleFav} onDel={deleteItem} />
              ))}
            </div>
          </div>
        )}

        {/* WARDROBE */}
        {route === 'wardrobe' && (
          <div className="page">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:28,flexWrap:'wrap',gap:12}}>
              <div>
                <div className="pill pill-pink" style={{marginBottom:8}}>Digital closet</div>
                <h1 className="serif page-title">My Wardrobe <span style={{color:'var(--pink-400)',fontWeight:400}}>({shown.length})</span></h1>
                <p className="page-subtitle">Browse, filter and manage every piece in your wardrobe.</p>
              </div>
              <button className="btn-primary" onClick={() => go('add')}>Add item</button>
            </div>

            {/* Filters */}
            <div className="card" style={{padding:20,marginBottom:24}}>
              <input
                type="text" placeholder="Search by name, colour, brand..." className="input"
                value={search} onChange={e => setSearch(e.target.value)}
                style={{marginBottom:16}}
              />
              <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:12}}>
                <div className="label" style={{width:'100%',margin:0}}>Category</div>
                {[['all','All'],['top','Tops'],['bottom','Bottoms'],['dress','Sarees & Dresses'],['footwear','Footwear'],['accessory','Accessories']].map(([c,l]) => (
                  <button key={c} className={\`chip \${catFilter===c?'active':''}\`} onClick={() => setCatFilter(c)}>{l}</button>
                ))}
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                <div className="label" style={{width:'100%',margin:0}}>Occasion</div>
                {[['all','All'],['garba','Garba'],['diwali','Diwali'],['college','College'],['wedding','Wedding'],['casual','Casual']].map(([o,l]) => (
                  <button key={o} className={\`chip \${occFilter===o?'active':''}\`} onClick={() => setOccFilter(o)}>{l}</button>
                ))}
              </div>
            </div>

            {shown.length > 0 ? (
              <div className="item-grid">
                {shown.map(item => <ItemCard key={item.id} item={item} onFav={toggleFav} onDel={deleteItem} />)}
              </div>
            ) : (
              <EmptyState
                title="No items found"
                desc="Try adjusting your search term or clearing the filters."
                cta="Add new item"
                onCta={() => go('add')}
                onReset={() => { setSearch(''); setCatFilter('all'); setOccFilter('all'); }}
              />
            )}
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {route === 'recommendations' && (
          <div className="page">
            <div className="page-header">
              <div className="pill pill-pink" style={{marginBottom:8}}>Outfit stylist</div>
              <h1 className="serif page-title">I have <span className="accent">nothing</span> to wear</h1>
              <p className="page-subtitle">Pick your occasion, weather, and formality. We will suggest the best combinations from your wardrobe.</p>
            </div>

            <div className="card" style={{padding:28,marginBottom:28}}>
              <div style={{marginBottom:20}}>
                <div className="label">Occasion</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {[['garba','Garba Night'],['diwali','Diwali Party'],['college','College'],['wedding','Wedding'],['casual','Cafe Date']].map(([o,l]) => (
                    <button key={o} className={\`chip \${recOcc===o?'active':''}\`} onClick={() => setRecOcc(o)}>{l}</button>
                  ))}
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
                <div>
                  <div className="label">Weather</div>
                  <select className="input" value={recWeather} onChange={e => setRecWeather(e.target.value)}>
                    <option value="normal">Normal / Pleasant</option>
                    <option value="hot">Sunny / Hot</option>
                    <option value="chilly">Chilly / Winter</option>
                    <option value="rainy">Rainy / Monsoon</option>
                  </select>
                </div>
                <div>
                  <div className="label">Formality — {recFormality}/5</div>
                  <input type="range" min="1" max="5" value={recFormality} onChange={e => setRecFormality(+e.target.value)} style={{marginTop:8}} />
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text-light)',marginTop:4}}>
                    <span>Casual</span><span>Formal</span>
                  </div>
                </div>
              </div>

              <button className="btn-primary" style={{width:'100%',justifyContent:'center',display:'flex'}} onClick={generateOutfits} disabled={generating}>
                {generating ? 'Finding your look...' : 'Generate outfit ideas'}
              </button>
            </div>

            {recOutfits.length > 0 ? (
              <div>
                <h2 className="serif" style={{fontSize:24,fontWeight:500,marginBottom:20}}>Your outfit suggestions</h2>
                {recOutfits.map((o,i) => (
                  <div key={o.id} className="card outfit-card">
                    <div className="outfit-card-header">
                      <div>
                        <div className="pill pill-pink" style={{marginBottom:8}}>{o.tag}</div>
                        <h3 className="outfit-card-title serif">{o.label}</h3>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8}}>
                        <span className="pill pill-green">{o.match}% match</span>
                      </div>
                    </div>
                    <div style={{marginBottom:12}}>
                      <div className="match-bar-bg"><div className="match-bar-fill" style={{width:o.match+'%'}}></div></div>
                    </div>
                    <div className="outfit-items-grid">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="outfit-item-mini">
                          <img src={item.imageUrl} alt={item.subcategory} style={{width:'100%',aspectRatio:'1',objectFit:'cover'}} />
                          <div className="outfit-item-mini-label">
                            <div style={{fontSize:10,fontWeight:600,color:'var(--pink-500)',textTransform:'uppercase',letterSpacing:'0.06em'}}>{item.category}</div>
                            <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{item.subcategory}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:'flex',justifyContent:'flex-end',gap:10,paddingTop:16,borderTop:'1px solid var(--border)'}}>
                      <button className="btn-secondary" style={{padding:'8px 18px',fontSize:12}} onClick={() => notify('Outfit saved to favourites!')}>Save look</button>
                      <button className="btn-primary" style={{padding:'8px 18px',fontSize:12}} onClick={() => notify('Outfit marked as worn today!')}>Wearing today</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Ready to style you"
                desc="Select an occasion above and tap Generate to see your outfit combinations."
                cta="Generate outfits"
                onCta={generateOutfits}
              />
            )}
          </div>
        )}

        {/* ADD ITEM */}
        {route === 'add' && (
          <div className="page">
            <div className="page-header">
              <div className="pill pill-pink" style={{marginBottom:8}}>Add clothing</div>
              <h1 className="serif page-title">Add to wardrobe</h1>
              <p className="page-subtitle">Upload a photo and describe your piece. It will appear instantly in your closet.</p>
            </div>

            <form onSubmit={submitItem} className="form-section">
              {/* Image upload */}
              <div className="form-group">
                <label className="label">Photo (optional)</label>
                <div style={{border:'2px dashed #fbcfe8',borderRadius:'16px',padding:24,textAlign:'center',background:'#fff8fb',cursor:'pointer'}}
                  onClick={() => document.getElementById('img-input').click()}>
                  {imgPreview ? (
                    <img src={imgPreview} style={{maxHeight:200,borderRadius:10,margin:'0 auto',display:'block'}} alt="preview" />
                  ) : (
                    <div>
                      <div style={{fontSize:13,fontWeight:500,color:'var(--text-muted)',marginBottom:4}}>Tap to upload a photo</div>
                      <div style={{fontSize:11,color:'var(--text-light)'}}>Auto-compressed to web quality</div>
                    </div>
                  )}
                  <input id="img-input" type="file" accept="image/*" onChange={handleImg} style={{display:'none'}} />
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                <div className="form-group">
                  <label className="label">Category</label>
                  <select className="input" value={form.category} onChange={e => setForm({...form, category:e.target.value})}>
                    <option value="top">Top / Kurti / Blouse</option>
                    <option value="bottom">Bottom / Lehenga / Jeans</option>
                    <option value="dress">Dress / Saree / Anarkali</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessory">Accessory / Jewellery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Item name *</label>
                  <input className="input" type="text" placeholder="e.g. Chikankari Kurta" value={form.subcategory} onChange={e => setForm({...form, subcategory:e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="label">Colour</label>
                  <input className="input" type="text" placeholder="e.g. Ivory White, Royal Blue" value={form.color} onChange={e => setForm({...form, color:e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="label">Fabric</label>
                  <input className="input" type="text" placeholder="e.g. Cotton, Silk, Denim" value={form.fabric} onChange={e => setForm({...form, fabric:e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Occasions *</label>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {['college','garba','diwali','wedding','puja','casual','date','party'].map(o => (
                    <button type="button" key={o} className={\`occ-tag \${form.occasion.includes(o)?'active':''}\`} onClick={() => toggleOcc(o)}>
                      {o.charAt(0).toUpperCase() + o.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="label">Formality — {form.formality}/5</label>
                <input type="range" min="1" max="5" value={form.formality} onChange={e => setForm({...form, formality:+e.target.value})} />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text-light)',marginTop:4}}>
                  <span>Very casual</span><span>Very formal</span>
                </div>
              </div>

              {formErr && <div style={{padding:'12px 16px',background:'#fff5f5',border:'1.5px solid #fecaca',borderRadius:10,color:'#b91c1c',fontSize:13,marginBottom:16}}>{formErr}</div>}

              <div style={{display:'flex',gap:10}}>
                <button type="button" className="btn-secondary" onClick={() => go('wardrobe')}>Cancel</button>
                <button type="submit" className="btn-primary">Save to wardrobe</button>
              </div>
            </form>
          </div>
        )}

        {/* TRIP PLANNER */}
        {route === 'trip' && (
          <div className="page">
            <div className="page-header">
              <div className="pill pill-pink" style={{marginBottom:8}}>Pack smarter</div>
              <h1 className="serif page-title">Trip & festival planner</h1>
              <p className="page-subtitle">Tell us where you are going and we will curate a packing list from your wardrobe.</p>
            </div>

            <form onSubmit={generatePack} className="card" style={{padding:24,marginBottom:28}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:16}}>
                <div>
                  <label className="label">Trip name</label>
                  <input className="input" type="text" value={tripName} onChange={e => setTripName(e.target.value)} />
                </div>
                <div>
                  <label className="label">Days</label>
                  <input className="input" type="number" min="1" max="14" value={tripDays} onChange={e => setTripDays(+e.target.value)} />
                </div>
                <div>
                  <label className="label">Primary occasion</label>
                  <select className="input" value={tripOcc} onChange={e => setTripOcc(e.target.value)}>
                    <option value="wedding">Wedding / Sangeet</option>
                    <option value="garba">Garba / Navratri</option>
                    <option value="diwali">Diwali</option>
                    <option value="casual">Casual vacation</option>
                    <option value="college">College trip</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary">Generate packing list</button>
            </form>

            {packList.length > 0 && (
              <>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                  <h2 className="serif" style={{fontSize:22,fontWeight:500}}>{checked_count} / {packList.length} items packed</h2>
                  <span className="pill pill-green">{Math.round((checked_count/packList.length)*100)}% ready</span>
                </div>
                <div className="progress-bg" style={{marginBottom:24}}>
                  <div className="progress-fill" style={{width:Math.round((checked_count/packList.length)*100)+'%'}}></div>
                </div>
                {packList.map(item => {
                  const done = !!checked[item.id];
                  return (
                    <div key={item.id} className={\`pack-item \${done?'checked':''}\`} onClick={() => setChecked(p => ({...p, [item.id]:!p[item.id]}))}>
                      <div className={\`pack-check \${done?'done':''}\`}>{done && 'x'}</div>
                      <img src={item.imageUrl} style={{width:52,height:60,objectFit:'cover',borderRadius:8,flexShrink:0}} />
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11,fontWeight:600,color:'var(--pink-500)',letterSpacing:'0.05em'}}>{item.packReason}</div>
                        <div style={{fontSize:14,fontWeight:500,color:'var(--text)',textDecoration:done?'line-through':'none'}}>{item.subcategory}</div>
                        <div style={{fontSize:12,color:'var(--text-muted)'}}>{item.fabric} · Size {item.size}</div>
                      </div>
                      <span className={\`pill \${done?'pill-green':'pill-soft'}\`}>{done?'Packed':'Unpacked'}</span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* 404 */}
        {route === '404' && (
          <div className="page">
            <div className="page-404">
              <div className="error-num serif">404</div>
              <h2 className="serif" style={{fontSize:32,fontWeight:500,marginBottom:12}}>Page not found</h2>
              <p style={{fontSize:14,color:'var(--text-muted)',marginBottom:28,maxWidth:360,margin:'0 auto 28px'}}>The fashion page or outfit link you are looking for does not exist.</p>
              <div style={{display:'flex',gap:12,justifyContent:'center'}}>
                <button className="btn-primary" onClick={() => go('home')}>Back to home</button>
                <button className="btn-secondary" onClick={() => go('wardrobe')}>My wardrobe</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{background:'white',borderTop:'1px solid var(--border)',padding:'40px 24px 32px',marginTop:40}}>
        <div style={{maxWidth:1120,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:40,marginBottom:32}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                <div className="nav-logo-mark">G</div>
                <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,fontWeight:600}}>GRWM</span>
              </div>
              <p style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.65,maxWidth:320}}>
                Smart digital wardrobe and outfit recommendation for Indian college girls. Made for Diwali, Garba, weddings, and everyday style.
              </p>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:'var(--text-light)',letterSpacing:'0.06em',marginBottom:14}}>NAVIGATION</div>
              {[['home','Home'],['wardrobe','My Wardrobe'],['recommendations','Suggest Outfit'],['trip','Trip Planner'],['add','Add Item']].map(([r,l]) => (
                <div key={r} onClick={() => go(r)} style={{fontSize:13,color:'var(--text-muted)',marginBottom:8,cursor:'pointer'}}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:'var(--text-light)',letterSpacing:'0.06em',marginBottom:14}}>SUPPORT</div>
              <a href="mailto:support@grwm.app" style={{display:'block',fontSize:13,color:'var(--pink-600)',fontWeight:500,marginBottom:8,textDecoration:'none'}}>support@grwm.app</a>
              <a href="tel:+919876543210" style={{display:'block',fontSize:13,color:'var(--text-muted)',textDecoration:'none'}}>+91 98765 43210</a>
            </div>
          </div>
          <div style={{borderTop:'1px solid var(--border)',paddingTop:20,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
            <span style={{fontSize:12,color:'var(--text-light)'}}>&copy; {new Date().getFullYear()} GRWM. All rights reserved.</span>
            <span style={{fontSize:12,color:'var(--text-light)'}}>Made for Indian college girls</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Item card component
function ItemCard({ item, onFav, onDel }) {
  return (
    <div className="card card-hover item-card">
      <div className="item-card-img">
        <img src={item.imageUrl} alt={item.subcategory} style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" />
      </div>
      <div className="item-card-body">
        <div className="item-card-cat">{item.category}</div>
        <div className="item-card-name">{item.subcategory}</div>
        <div className="item-card-meta">{item.colorName || item.color} &middot; {item.fabric}</div>
      </div>
      <div className="item-card-actions">
        <button className="item-card-fav" onClick={() => onFav(item.id)}>{item.favorite ? 'Saved' : 'Save'}</button>
        <button className="item-card-del" onClick={() => onDel(item.id)}>Remove</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(HTML);
});

server.listen(PORT, () => {
  console.log('GRWM is running at http://localhost:' + PORT);
});
