/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smartphone, Check, Landmark, Truck, Headphones, Route } from 'lucide-react';

interface ActivationTimelineProps {
  onOpenCheckout: () => void;
}

export default function ActivationTimeline({ onOpenCheckout }: ActivationTimelineProps) {
  
  const steps = [
    {
      title: '1. Selecione as Preferências',
      desc: 'Escolha a operadora física desejada e o formato (eSIM digital instantâneo ou Chip físico).',
      icon: Smartphone,
      time: '1 min'
    },
    {
      title: '2. Efetue a Mensalidade',
      desc: 'Pague com segurança no PIX simples sem juros de atraso, anuidades ocultas ou tarifas pendentes.',
      icon: Landmark,
      time: '1 min'
    },
    {
      title: '3. Recebimento Técnico',
      desc: 'Os eSIMs digitais são despachados no seu e-mail e Zap na hora. Chips físicos vão por Sedex grátis.',
      icon: Truck,
      time: 'Instantâneo'
    },
    {
      title: '4. Instalação e Ativação',
      desc: 'Escaneie o QR Code em 2min ou insira o chip. Nossa equipe auxilia no suporte do Zap passo a passo.',
      icon: Headphones,
      time: '5 a 10 min'
    },
    {
      title: '5. Navegue sem Limites',
      desc: 'Tudo pronto! Navegue com a potência máxima corporativa original TIM, Vivo ou Claro sem precisar de VPN.',
      icon: Route,
      time: 'Uso Imediato'
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24" id="passos-ativacao">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-16">
          <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
            Jornada de Início Rápida
          </span>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
            Passo a passo: Da escolha ao sinal no celular
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Nós removemos qualquer complexidade contratual para simplificar sua vida. Veja exatamente o que acontece quando você decide adquirir sua linha hoje.
          </p>
        </div>

        {/* Horizontal Timeline Grid for Desktop, list for Mobile */}
        <div className="relative">
          
          {/* Connector horizontal line for Desktop */}
          <div className="absolute top-[37px] left-10 right-10 hidden lg:block h-0.5 bg-slate-100 -z-15" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-4 group relative"
                  id={`timeline-step-${index}`}
                >
                  
                  {/* Step Icon circle marker with number badge */}
                  <div className="relative flex h-18 w-18 items-center justify-center rounded-3xl bg-slate-50 border border-slate-150 text-brand-500 shadow-sm group-hover:border-brand-300 group-hover:bg-brand-50/20 group-hover:-translate-y-1 transition-all">
                    
                    {/* Circle Indicator */}
                    <IconComponent className="h-7 w-7 stroke-[1.5]" />
                    
                    {/* Number Counter Badge */}
                    <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white font-mono">
                      {index + 1}
                    </span>
                  </div>

                  {/* Context Info info text */}
                  <div className="space-y-1.5 px-3">
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-bold">
                      {step.time}
                    </span>
                    <h3 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">
                      {step.title}
                    </h3>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Underline Prompt to trigger action */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenCheckout}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-sans font-black text-xs md:text-sm text-white py-3.5 px-8 shadow-lg shadow-emerald-500/15 hover:-translate-y-0.5 transition-all cursor-pointer"
            id="timeline-main-cta"
          >
            PAGAR AGORA
          </button>
        </div>

      </div>
    </section>
  );
}
