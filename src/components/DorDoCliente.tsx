/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface DorDoClienteProps {
  onOpenPlans: () => void;
}

export default function DorDoCliente({ onOpenPlans }: DorDoClienteProps) {
  const pains = [
    { title: 'Nome negativado', desc: 'Restrições financeiras impedem a aprovação de planos pós-pagos tradicionais.' },
    { title: 'Fidelidade de 12 meses', desc: 'Contratos abusivos que prendem você e obrigam a pagar altas taxas de cancelamento.' },
    { title: 'Plano caro', desc: 'Franquias minúsculas de internet que acabam na metade do mês por preços absurdos.' },
    { title: 'Burocracia para aprovação', desc: 'Fichas intermináveis, exigências de faturamento e processos cansativos.' },
    { title: 'Multas absurdas', desc: 'Cobranças surpresa na sua fatura por serviços que você nunca pediu ou cancelamentos.' },
    { title: 'Pouca internet', desc: 'Sua velocidade é reduzida drasticamente antes do mês acabar, te deixando desconectado.' }
  ];

  const solutions = [
    { title: 'Sem consulta SPC/Serasa', desc: 'Parceria corporativa associativa. Todos têm direito à aprovação irrestrita de forma imediata.' },
    { title: 'Mais internet pagando menos', desc: 'Navegação de alta velocidade aproveitando a infraestrutura das maiores antenas com descontos em massa.' },
    { title: 'Ativação simplificada', desc: 'Sem papelada ou faturas complicadas. Ativação direta em formato eSIM ou chip físico.' },
    { title: 'Sem fidelidade', desc: 'Total liberdade para continuar apenas enquanto gostar, podendo interromper quando preferir sem multas.' },
    { title: 'Atendimento humano', desc: 'Nossa equipe de suporte acompanha você individualmente pelo WhatsApp sem filas ou robôs chatos.' }
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24 border-t border-b border-slate-100" id="dor-do-cliente">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3.5 py-1 text-xs font-bold text-red-600">
            <ShieldAlert className="h-3.5 w-3.5" /> Fim das Barreiras de Aprovação
          </span>
          <h2 className="font-sans font-black tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
            Cansado de ser reprovado pelas operadoras?
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Muitas pessoas deixam de ter um bom plano simplesmente porque não conseguem aprovação nas operadoras tradicionais.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-14">
          
          {/* PAIN PANEL */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🎒</span>
                <h3 className="font-sans font-black text-slate-900 text-md sm:text-lg">
                  Como funciona os plano direto das operadoras tradicionais:
                </h3>
              </div>

              <div className="space-y-5">
                {pains.map((pain, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-extrabold text-[#0f172a] text-xs sm:text-sm">
                        {pain.title}
                      </h4>
                      <p className="text-[11.5px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {pain.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-6 mt-6 text-center">
              <span className="text-xs font-semibold text-slate-500">
                ⚠️ Burocracia cansativa e restrições injustas
              </span>
            </div>
          </div>

          {/* SOLUTION PANEL */}
          <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 rounded-[2.5rem] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl shadow-purple-950/10 border-2 border-purple-500/30">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🏆</span>
                <h3 className="font-sans font-black text-purple-200 text-md sm:text-lg">
                  A alternativa do mesmo plano vivo tim e claro , sendo nosso associado !
                </h3>
              </div>

              <div className="space-y-5">
                {solutions.map((sol, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-extrabold text-white text-xs sm:text-sm">
                        {sol.title}
                      </h4>
                      <p className="text-[11.5px] sm:text-xs text-purple-200/70 mt-0.5 leading-relaxed">
                        {sol.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mt-6 text-center">
              <button
                onClick={onOpenPlans}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-black text-white hover:scale-[1.02] active:scale-95 transition-all text-center cursor-pointer shadow-md shadow-emerald-500/15"
              >
                PAGAR AGORA
              </button>
            </div>
          </div>

        </div>

        {/* Bottom emotional callout bar */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 sm:p-6 text-center max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            “Finalmente achei uma alternativa. Não preciso passar vergonha tentando aprovar plano, não preciso ficar preso em contrato e posso ativar rápido!”
          </p>
        </div>

      </div>
    </section>
  );
}
