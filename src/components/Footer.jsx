'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full glass-panel border-t border-white/10 mt-20 px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Description */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-sm">
              G
            </div>
            <span className="font-heading font-extrabold text-lg text-slate-100 tracking-wider">
              GRWM
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Smart digital wardrobe & outfit recommendation engine tailored specifically for Indian college girls, festivals (Diwali, Garba, Weddings), and everyday style.
          </p>
          <div className="text-[11px] text-amber-500/80 font-bold uppercase tracking-widest mt-2">
            DESIGNED FOR INDIAN FASHION
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-widest border-b border-white/10 pb-2">
            QUICK NAVIGATION
          </span>
          <Link href="/wardrobe" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
            MY WARDROBE
          </Link>
          <Link href="/recommendations" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
            OUTFIT RECOMMENDATION
          </Link>
          <Link href="/trip-planner" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
            TRIP PACKING PLANNER
          </Link>
          <Link href="/add-item" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
            ADD CLOTHING ITEM
          </Link>
          <Link href="/not-found" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
            404 HELP PAGE
          </Link>
        </div>

        {/* Clickable Support Links */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-widest border-b border-white/10 pb-2">
            CONTACT & SUPPORT
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase">EMAIL SUPPORT</span>
            <a
              href="mailto:support@grwm.app"
              className="text-xs text-amber-400 hover:underline underline-offset-4 font-semibold"
            >
              support@grwm.app
            </a>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase">HELPLINE PHONE</span>
            <a
              href="tel:+919876543210"
              className="text-xs text-slate-300 hover:text-white font-medium"
            >
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>&copy; {new Date().getFullYear()} GRWM FASHION APP. ALL RIGHTS RESERVED.</span>
        <span className="mt-2 md:mt-0 uppercase tracking-widest text-[10px]">
          CLEAN TYPOGRAPHY • ZERO EMOJIS • NO ICONS
        </span>
      </div>
    </footer>
  );
}
