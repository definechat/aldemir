/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Check, Users, ArrowRight, Sparkles } from 'lucide-react';
import { PLANS, OperatorType } from '../types';

interface HeroProps {
  onOpenCheckout: (operator: OperatorType, chipType: 'eSIM' | 'CHIP', productCode?: string) => void;
}

export default function Hero({ onOpenCheckout }: HeroProps) {
  const [activeOperatorTab, setActiveOperatorTab] = useState<OperatorType>('CLARO');

  const handleScrollToPlans = () => {
    const element = document.getElementById('planos-hero-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-24" id="hero-section">
      {/* Premium background radial highlights, soft purple/lilac glow theme */}
      <div className="absolute top-0 left-1/2 -z-10 h-[650px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_65%)] pointer-events-none" />
      <div className="absolute top-20 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-100/30 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-10 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-50/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Centered Premium plan switcher */}
        <div 
          id="planos-hero-container" 
          className="flex flex-col w-full bg-slate-50/50 rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-slate-200/60 shadow-xl relative overflow-hidden"
        >
          {/* Background design elements */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-purple-200/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-200/10 blur-3xl pointer-events-none" />

          {/* Header Title inside Hero container */}
          <div className="text-center space-y-3 mb-8 relative z-10">
            <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-[11px] font-extrabold text-emerald-700 tracking-wide uppercase">
              Assinaturas Sob Medida corporativas
            </span>
            <h2 className="font-sans font-black tracking-tight text-slate-900 text-2xl sm:text-3xl">
              Escolha sua operadora
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Sem limite de navegação diário, sem redução de velocidade, sem fidelidade chata. eSIM ativado de imediato no mesmo dia, sem consulta cadastral.
            </p>
          </div>

          {/* Operator switcher tabs */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="inline-flex rounded-2xl bg-white/80 backdrop-blur-xs p-1.5 border border-slate-200 shadow-sm">
              {(['CLARO', 'TIM'] as OperatorType[]).map((op) => {
                const isActive = activeOperatorTab === op;
                let activeStyle = '';
                if (op === 'TIM') {
                  activeStyle = 'bg-blue-600 text-white shadow-md shadow-blue-600/15';
                } else {
                  activeStyle = 'bg-red-600 text-white shadow-md shadow-red-600/15';
                }
                return (
                  <button
                    key={op}
                    onClick={() => setActiveOperatorTab(op)}
                    className={`rounded-xl px-5 py-2.5 text-xs font-bold tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? activeStyle
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    {op === 'TIM' ? '🔵 TIM' : '🔴 CLARO'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plan Cards Grid Inside Hero */}
          <div className={`grid grid-cols-1 ${
            PLANS.filter(p => p.operator === activeOperatorTab).length === 3 
              ? 'md:grid-cols-3' 
              : PLANS.filter(p => p.operator === activeOperatorTab).length === 2 
                ? 'md:grid-cols-2 max-w-4xl mx-auto' 
                : 'max-w-md mx-auto'
          } gap-6 items-stretch w-full relative z-10`}>
            {PLANS.filter((plan) => plan.operator === activeOperatorTab).map((plan) => {
              let highlightsStyle = '';
              let btnStyle = '';
              let checkIndicatorBg = '';
              let bulletColor = '';

              if (activeOperatorTab === 'VIVO') {
                highlightsStyle = plan.highlight
                  ? 'bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white border-2 border-purple-500 shadow-xl shadow-purple-950/20'
                  : 'bg-white border text-slate-900 border-purple-100/80 hover:border-purple-200';
                btnStyle = 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20';
                checkIndicatorBg = plan.highlight ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-50 text-purple-700';
                bulletColor = plan.highlight ? 'text-purple-300' : 'text-slate-705';
              } else if (activeOperatorTab === 'TIM') {
                highlightsStyle = plan.highlight
                  ? 'bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white border-2 border-blue-500 shadow-xl shadow-blue-950/20'
                  : 'bg-white border text-slate-900 border-blue-100 hover:border-blue-200';
                btnStyle = 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-blue-600/20';
                checkIndicatorBg = plan.highlight ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-700';
                bulletColor = plan.highlight ? 'text-blue-300' : 'text-slate-700';
              } else {
                highlightsStyle = plan.highlight
                  ? 'bg-gradient-to-br from-red-950 via-slate-950 to-red-955 text-white border-2 border-red-500 shadow-xl shadow-red-955/25'
                  : 'bg-white border text-slate-900 border-red-100/80 hover:border-red-200';
                btnStyle = 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20';
                checkIndicatorBg = plan.highlight ? 'bg-red-500/15 text-red-300' : 'bg-red-50 text-red-650';
                bulletColor = plan.highlight ? 'text-red-300' : 'text-slate-705';
              }

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-[2.25rem] p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${highlightsStyle}`}
                  id={`plan-card-hero-${plan.id}`}
                >
                  
                  {plan.highlight && (
                    <span className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-3.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} /> O Mais Procurado
                    </span>
                  )}

                  <div className="space-y-5">
                    <div>
                      <h3 className={`font-sans font-black text-md sm:text-lg ${
                        plan.highlight
                          ? activeOperatorTab === 'TIM'
                            ? 'text-blue-200'
                            : 'text-red-200'
                          : 'text-slate-900'
                      }`}>
                        {plan.name}
                      </h3>
                      <div className="mt-2.5 flex items-baseline gap-0.5">
                        <span className="text-2xl sm:text-3xl font-black">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                        <span className={`text-[11px] font-medium ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/mês</span>
                      </div>
                      <p className={`text-[10px] sm:text-[11px] font-mono mt-1 ${plan.highlight ? 'text-emerald-400 font-extrabold' : 'text-slate-500'}`}>
                        {plan.dataGb} {plan.hasCalling ? 'COM LIGAÇÕES ILIMITADAS' : 'FRANQUIA DADOS COML'}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className={`space-y-2 pt-4 border-t ${plan.highlight ? 'border-white/10' : 'border-slate-100'}`}>
                      {plan.features.slice(0, 5).map((feat, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${checkIndicatorBg}`}>
                            <Check className="h-2 w-2 stroke-[3]" />
                          </div>
                          <span className={`text-[11.5px] leading-tight font-sans font-medium ${bulletColor}`}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan Call to Action */}
                  <div className="pt-4 mt-5 border-t border-dashed border-slate-200/40">
                    <button
                      onClick={() => onOpenCheckout(activeOperatorTab, 'eSIM', plan.productCode)}
                      className={`w-full rounded-xl py-3 px-3 font-sans font-black text-xs text-center shadow-sm active:scale-95 transition-all cursor-pointer ${btnStyle}`}
                      id={`select-plan-hero-${plan.id}`}
                    >
                      PAGAR AGORA
                    </button>
                    
                    {/* Microcopies */}
                    <div className="mt-3 text-center space-y-0.5">
                      <p className={`text-[10px] font-bold ${plan.highlight ? 'text-emerald-400' : 'text-slate-700'}`}>
                        “Ativação online via WhatsApp.”
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
