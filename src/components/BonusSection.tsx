/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Ticket, Award, Gift, DollarSign, Smartphone, Clapperboard, Gem, Percent, ShieldCheck, Check } from 'lucide-react';
import { BONUS_CARDS } from '../types';

interface BonusSectionProps {
  onOpenCheckout: () => void;
}

export default function BonusSection({ onOpenCheckout }: BonusSectionProps) {
  
  // Custom layout helpers for rendering illustrative vector patterns in each category
  const renderCardIllustration = (category: string) => {
    switch (category) {
      case 'internet':
        return (
          <div className="relative h-28 w-full rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)]" />
            <div className="flex items-center gap-3 text-white z-10">
              <Smartphone className="h-10 w-10 stroke-[1.5] drop-shadow-md animate-soft-pulse" />
              <div>
                <div className="h-1.5 w-16 bg-white/20 rounded-full mb-1" />
                <div className="h-2 w-24 bg-brand-200 rounded-full" />
                <div className="flex gap-1 mt-2">
                  <div className="h-1 w-2 bg-emerald-400 rounded-xs" />
                  <div className="h-2 w-2 bg-emerald-400 rounded-xs animate-pulse" />
                  <div className="h-3 w-2 bg-emerald-400 rounded-xs" />
                  <div className="h-4 w-2 bg-emerald-300 rounded-xs" />
                </div>
              </div>
            </div>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-white/40 tracking-widest uppercase">SIGNAL LTE+ VIP</span>
          </div>
        );
      case 'cinema':
        return (
          <div className="relative h-28 w-full rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="flex items-center gap-4 text-white z-10">
              <Clapperboard className="h-10 w-10 stroke-[1.5] drop-shadow-md" />
              <div className="space-y-1">
                <span className="inline-block rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">TICKET MENSAL</span>
                <p className="text-xs font-bold font-sans">Voucher Liberado</p>
              </div>
            </div>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-white/30 tracking-widest uppercase">CINE CLUBE</span>
          </div>
        );
      case 'perfume':
        return (
          <div className="relative h-28 w-full rounded-2xl bg-gradient-to-tr from-purple-950 via-purple-900 to-indigo-950 overflow-hidden flex items-center justify-center p-4">
            {/* Elegant luxury backdrop */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.3),transparent_70%)]" />
            <div className="flex items-center gap-3.5 text-white z-10">
              <Gem className="h-10 w-10 stroke-[1.5] text-purple-200 animate-soft-pulse" />
              <div>
                <p className="text-xs font-bold font-sans text-brand-100 tracking-wide">Eau de Parfum</p>
                <p className="text-[10px] text-purple-200 leading-normal">Campanha de Fragrâncias Importadas</p>
              </div>
            </div>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-white/30 tracking-widest uppercase">EAU DE LUXE</span>
          </div>
        );
      case 'cashback':
        return (
          <div className="relative h-28 w-full rounded-2xl bg-gradient-to-tr from-emerald-555 from-emerald-500 to-teal-600 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,0.5),transparent_60%)]" />
            <div className="flex items-center gap-3.5 text-white z-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <Percent className="h-5.5 w-5.5 stroke-[2] text-white" />
              </div>
              <div>
                <p className="text-xs font-bold font-sans">Cashback e Clube</p>
                <p className="text-[10px] text-emerald-100 leading-normal">Descontos Reais em Lojas Parceiras</p>
              </div>
            </div>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-white/30 tracking-widest uppercase">CASHBACK CLUB</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-slate-50/65 py-16 md:py-24 border-y border-slate-100/50" id="bonus">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold text-brand-700">
            <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            Benefícios Premium Inclusos
          </div>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
            Ativando hoje, você também recebe:
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Além da sua internet ilimitada empresarial, sua taxa de associação dá direito de resgatar bônus e vantagens exclusivas sem custos ocultos na mensalidade básica.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {BONUS_CARDS.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col justify-between rounded-3xl bg-white p-5 border border-slate-100 shadow-xs hover:shadow-lg hover:border-slate-205 transition-all"
              id={`bonus-[${card.category}]-card`}
            >
              <div className="space-y-4">
                {/* Visual Illustration inside card */}
                {renderCardIllustration(card.category)}

                {/* Card Title */}
                <h3 className="font-sans font-extrabold text-slate-850 text-base md:text-lg group-hover:text-brand-600 transition-colors">
                  {card.title}
                </h3>

                {/* Card description text */}
                <p className="text-[12.5px] text-slate-600 leading-relaxed font-sans">
                  {card.text}
                </p>
              </div>

              {/* Tags/badges list for each card */}
              <div className="mt-5 pt-4 border-t border-slate-50 space-y-1.5">
                {card.badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* VALOR PERCEBIDO BLOCK - Seu Combo Completo */}
        <div className="rounded-[2.5rem] bg-gradient-to-tr from-brand-900 via-brand-950 to-indigo-950 text-white p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Neon layout highlight vectors */}
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl -z-0" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center relative z-10">
            
            {/* Left Box text */}
            <div className="space-y-4 lg:col-span-7">
              <span className="inline-block rounded-full bg-brand-400/25 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-300">
                Seu Combo Completo
              </span>
              <h3 className="font-sans font-black tracking-tight text-white text-xl sm:text-2xl md:text-3xl leading-snug">
                Você não está contratando apenas internet móvel regular
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                A <strong>Internet Limitada</strong> foi desenhada para romper com as amarras das operadoras tradicionais brasileira. Reunimos em uma única assinatura corporativa simplificada conectividade estável extrema, clube de vantagens reais com retorno financeiro ativo e atendimento VIP sem robozinho.
              </p>
            </div>

            {/* Right checklist & CTA block */}
            <div className="lg:col-span-5 bg-white/5 rounded-2xl p-6 border border-white/10 space-y-5">
              <p className="text-xs font-mono uppercase tracking-wider text-brand-300 font-bold border-b border-white/10 pb-2">
                O QUE ESTÁ INTEGRADO NA ATIVAÇÃO:
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Internet 4G/5G Corporativa',
                  'Ligações ilimitadas Brasil',
                  'Benefício de Cinema Mensal',
                  'Clube ativo e Cashback',
                  'eSIM Digital instantâneo',
                  'Cancelamento simplificado'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                    <span className="text-[11.5px] font-bold text-slate-100 font-sans">{item}</span>
                  </div>
                ))}
              </div>

              {/* Fast Activation CTA inside perceived value card */}
              <button
                onClick={onOpenCheckout}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-black text-xs md:text-sm py-3 px-4 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                id="perceived-activate-btn"
              >
                <span>PAGAR AGORA</span>
                <Sparkles className="h-4.5 w-4.5 text-white animate-pulse" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
