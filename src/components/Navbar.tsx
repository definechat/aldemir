/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Sparkles, PhoneCall, Cpu, Wifi } from 'lucide-react';

interface NavbarProps {
  onOpenCheckout: () => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
      {/* Sleek top announcement trust bar */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 py-1.5 text-center text-[10px] sm:text-xs text-white font-medium">
        <div className="mx-auto max-w-7xl px-4 flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
          <span className="flex items-center gap-1">✅ <strong>Sem consulta ao SPC/Serasa</strong></span>
          <span className="text-purple-400 font-bold hidden sm:inline">•</span>
          <span className="flex items-center gap-1">✅ <strong>Sem fidelidade</strong></span>
          <span className="text-purple-400 font-bold hidden sm:inline">•</span>
          <span className="flex items-center gap-1">✅ <strong>Ativação online</strong></span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo design resembling Fintech & Telecom alliance */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/10 relative overflow-hidden group">
            <Cpu className="h-5.5 w-5.5 stroke-[2] absolute group-hover:scale-110 transition-transform" />
            <Wifi className="h-3 w-3 absolute bottom-1 right-1 text-emerald-300 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-black tracking-tight text-slate-900 text-base sm:text-lg">
                ChipLivre<span className="text-brand-500 font-bold"> Brasil</span>
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-600 uppercase tracking-wide">
                Conectividade
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-sans tracking-wide">Internet Ilimitada Legítima</p>
          </div>
        </div>



        {/* Active Support & Quick Activate CTA */}
        <div className="flex items-center gap-3">
          {/* Support Indicator Badge with green dot */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50/50 px-3 py-1 text-[11px] font-medium text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-555 bg-emerald-500"></span>
            </span>
            <span>Suporte Zap Ativo</span>
          </div>

          <button
            onClick={onOpenCheckout}
            className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 cursor-pointer active:scale-98"
            id="nav-activate-btn"
          >
            PAGAR AGORA
          </button>
        </div>

      </div>
    </header>
  );
}
