'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Header({ itemCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'DASHBOARD' },
    { href: '/wardrobe', label: 'MY WARDROBE' },
    { href: '/recommendations', label: 'SUGGEST OUTFIT' },
    { href: '/trip-planner', label: 'TRIP PLANNER' },
  ];

  const isActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg group-hover:scale-105 transition-transform">
              G
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wider text-slate-100 group-hover:text-amber-400 transition-colors">
                GRWM
              </span>
              <span className="text-[10px] font-semibold text-amber-500/80 tracking-widest uppercase -mt-1">
                FASHION WARDROBE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                    active
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="mailto:support@grwm.app"
              className="text-xs font-semibold text-slate-400 hover:text-amber-400 underline underline-offset-4 tracking-wider transition-colors"
            >
              support@grwm.app
            </a>
            <Link
              href="/add-item"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all"
            >
              + ADD ITEM
            </Link>
          </div>

          {/* Mobile Menu Toggle Button (Zero Icons/Emojis) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden px-3.5 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest hover:bg-amber-500/20 transition-colors"
          >
            MENU
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        itemCount={itemCount}
      />
    </>
  );
}
