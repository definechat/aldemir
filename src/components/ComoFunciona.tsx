/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Sparkles, Smartphone, Layers, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface ComoFuncionaProps {
  onOpenCheckout: () => void;
}

export default function ComoFunciona({ onOpenCheckout }: ComoFuncionaProps) {
  const steps = [
    {
      num: '01',
      title: 'Escolha seu plano',
      desc: 'Selecione qual plano e operadora parceira (TIM, Vivo ou Claro) possui a melhor qualidade de sinal e franquia para as suas necessidades diárias.',
      icon: Smartphone,
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    },
    {
      num: '02',
      title: 'Finalize sua habilitação associativa',
      desc: 'Preencha os dados básicos necessários de habilitação para a liberação da sua linha em nosso sistema cooperativo, sem burocracias ou consultas.',
      icon: Layers,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    {
      num: '03',
      title: 'Nossa equipe entra em contato no WhatsApp',
      desc: 'Nossos técnicos entram em contato direto com você para providenciar todas as orientações personalizadas na mesma hora.',
      icon: HelpCircle,
      color: 'text-amber-650 bg-amber-50 border-amber-100 text-amber-650'
    },
    {
      num: '04',
      title: 'Sua linha é ativada',
      desc: 'Seu eSIM virtual ou chip físico é prontamente configurado em seu smartphone para você já sair navegando no mesmo dia.',
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24" id="como-funciona">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Upper Header Layout */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-100 px-3.5 py-1 text-xs font-bold text-brand-700">
            <Shield className="h-3.5 w-3.5" /> Ativação Rápida e Transparente
          </span>
          <h2 className="font-sans font-black tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
            Como funciona a ativação?
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Processo 100% digital e assistido por especialistas, eliminando filas de espera e atendimentos robotizados.
          </p>
        </div>

        {/* 4 Steps Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  const element = document.getElementById('planos');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative rounded-3xl bg-slate-50/50 p-6 border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all flex flex-col justify-between group cursor-pointer"
                id={`como-funciona-step-${index + 1}`}
              >
                {/* Steps Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${step.color} shadow-xs`}>
                    <IconComponent className="h-5.5 w-5.5 stroke-[2]" />
                  </div>
                  <span className="font-mono text-xl font-black text-slate-300 tracking-tight">
                    {step.num}
                  </span>
                </div>

                {/* Info Text */}
                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-[#0f172a] text-sm md:text-base">
                    {step.title}
                  </h3>
                  <p className="text-[12px] md:text-[12.5px] text-slate-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                {/* Visual arrow indicator */}
                <div className="mt-5 text-[11px] font-bold text-purple-600 flex items-center gap-1 group-hover:text-purple-700 transition-colors">
                  Iniciar ativação <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Visual Highlight component requested */}
        <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white border border-purple-500/20 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <h3 className="font-sans font-black text-lg sm:text-xl text-emerald-400">
              Você não precisa configurar sozinho.
            </h3>
            <p className="text-xs text-purple-200 leading-normal font-sans">
              Um atendente real do suporte técnico da INTERNET ILIMITADA acompanha você passo a passo no seu WhatsApp comercial para instalar o seu chip, portar o seu número antigo ou tirar qualquer dúvida técnica. Simples assim.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenCheckout}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-black text-white shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                id="como-funciona-highlight-action"
              >
                PAGAR AGORA
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
