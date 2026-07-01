/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Award, ShieldCheck, HeartHandshake, Check, Anchor, BadgeAlert } from 'lucide-react';

interface ObjectionSectionProps {
  onOpenCheckout: () => void;
}

export default function ObjectionSection({ onOpenCheckout }: ObjectionSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" id="transparencia">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout box */}
        <div className="rounded-3xl bg-brand-50/40 p-8 md:p-14 border border-brand-100 shadow-xs relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-2 right-2 h-44 w-44 rounded-full bg-brand-200/20 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-center relative z-10">
            
            {/* Left Column: Trust seals & badges */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3.5 py-1 text-xs font-bold text-brand-700">
                <HeartHandshake className="h-4 w-4" />
                Compromisso antifraude de verdade
              </div>

              {/* Title: Pagamento transparente e ativação acompanhada */}
              <h2 className="font-sans font-black tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
                Pagamento transparente e ativação acompanhada
              </h2>

              {/* Underlying explanation block */}
              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                O valor pago corresponde à habilitação da sua linha dentro da associação parceira. Após a confirmação, nossa equipe realiza toda ativação e acompanha você pelo WhatsApp até a linha funcionar perfeitamente.
              </p>

              {/* Bullet points mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-sans text-xs">
                {[
                  { title: 'Suporte humano', desc: 'Atendimento de ponta a ponta com especialistas reais de prontidão.' },
                  { title: 'Ativação acompanhada', desc: 'Nossa equipe ajuda você em cada configuração para garantir o sucesso.' },
                  { title: 'Sem cobrança surpresa', desc: 'Preço fixado do plano, sem sustos ou taxas invisíveis adicionais.' },
                  { title: 'Garantia de ativação', desc: 'Compromisso contratual da linha rodar perfeitamente em seu smartphone.' },
                  { title: 'Processo transparente', desc: 'Habilitação legítima sob as normas de telecomunicação da ANATEL.' },
                  { title: 'Atendimento via WhatsApp', desc: 'Canal de comunicação instantâneo e amigável sem robôs no caminho.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-905 text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-550 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Visual Trust Card resembling an Official Policy Cert */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-150 shadow-md space-y-5">
              
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-sm">Garantia Internet Limitada</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight">Garantia Plena de Segurança Consumerista</p>
                </div>
              </div>

              {/* Core text emphasizing trust */}
              <div className="space-y-3.5">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                  <p className="text-sm font-black text-emerald-850 text-emerald-800">
                    🛡️ Se sua linha não for ativada, devolvemos 100% do valor.
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Assumimos todo o risco técnico por você. Caso o sinal da operadora escolhida (TIM, Vivo ou Claro) não funcione de maneira excelente em sua região, o reembolso é integrado e imediato via PIX.
                </p>
                
                <div className="rounded-xl bg-slate-50 p-3 flex items-center justify-center gap-2.5 border border-slate-100">
                  <span className="text-[11px] font-mono font-bold tracking-tight text-brand-700">
                    CNPJ REGULARIZADO: 45.147.258/0001-53
                  </span>
                </div>
              </div>

              {/* Action Buttons inside objection block */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onOpenCheckout}
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs py-2.5 px-4 text-center shadow-md transition-all cursor-pointer"
                  id="objection-cta"
                >
                  PAGAR AGORA
                </button>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">
                     Sem Taxa de Cancelamento • Sem Protesto Serasa
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
