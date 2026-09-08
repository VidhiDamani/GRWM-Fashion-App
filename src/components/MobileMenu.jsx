'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileMenu({ isOpen, onClose, itemCount }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const navItems = [
    { href: '/', label: 'DASHBOARD' },
    { href: '/wardrobe', label: 'MY WARDROBE' },
    { href: '/recommendations', label: 'I HAVE NOTHING TO WEAR' },
    { href: '/trip-planner', label: 'TRIP & FESTIVAL PLANNER' },
    { href: '/add-item', label: 'ADD NEW ITEM' },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-fashion-card border-l border-amber-500/20 h-full p-6 flex flex-col justify-between z-10 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {/* Header inside Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base tracking-wider text-amber-400">
                GRWM
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase">
                MOBILE MENU
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded border border-white/20 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider"
            >
              CLOSE
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`px-4 py-3 rounded-xl text-xs font-bold tracking-widest transition-all ${
                    active
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info inside Drawer */}
        <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              CONTACT SUPPORT
            </span>
            <a
              href="mailto:support@grwm.app"
              className="text-xs text-amber-400 font-semibold underline underline-offset-2"
            >
              support@grwm.app
            </a>
            <a
              href="tel:+919876543210"
              className="text-xs text-slate-300 font-medium"
            >
              +91 98765 43210
            </a>
          </div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">
            GRWM V1.0 • INDIAN FASHION APP
          </div>
        </div>
      </div>
    </div>
  );
}
