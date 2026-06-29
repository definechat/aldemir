/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ComparativoProps {
  onOpenCheckout: () => void;
}

export default function Comparativo({ onOpenCheckout }: ComparativoProps) {
  
  const comparisonRows = [
    {
      criteria: 'Prazo Contratual',
      traditional: 'Contrato de 12 meses e Fidelidade obrigatória',
      federal: 'Sem fidelidade contratual, Cancelamento quando quiser',
    },
    {
      criteria: 'Inadimplência',
      traditional: 'Nome negativado ao atrasar com juros compostos',
      federal: 'A linha apenas é pausada sem multas ou negativação',
    },
    {
      criteria: 'Facilidade de Entrada',
      traditional: 'Aprovação difícil e análise profunda de crédito',
      federal: 'Ativação simplificada, Sem burocracia ou análise de SPC/Serasa',
    },
    {
      criteria: 'Relação Custo-Benefício',
      traditional: 'Faturas altas com pouca internet disponível pelo preço',
      federal: 'Mais internet de alta velocidade pagando muito menos',
    }
  ];

  return (
    <section className="bg-slate-50/50 py-16 md:py-24" id="comparativo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
          <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
            Cansado dos planos pós-pagos tradicionais?
          </span>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
            Liberdade móvel sem amarras corporativas ou judiciais
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Compare os problemas crônicos dos planos oferecidos diretamente pelas operadoras com as vantagens exclusivas do modelo associativo inovador da ChipLivre Brasil.
          </p>
        </div>

        {/* Comparison Desk Block */}
        <div className="overflow-hidden rounded-3xl border border-slate-150 bg-white shadow-xs">
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-sans">
              
              {/* Table Headers */}
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">Critério</th>
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider text-slate-400 w-3/8">Operadoras Comuns (Física)</th>
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50/30 w-3/8 flex items-center gap-1.5 font-sans">
                    <Sparkles className="h-4 w-4 animate-bounce text-brand-500" /> ChipLivre Brasil
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-[12px] sm:text-xs">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Criterion Title */}
                    <td className="p-4 sm:p-6 font-bold text-slate-900 leading-normal">
                      {row.criteria}
                    </td>

                    {/* Traditional Op Column */}
                    <td className="p-4 sm:p-6 text-slate-600 leading-relaxed font-sans">
                      <div className="flex items-start gap-2">
                        <X className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>

                    {/* Federal Connect Column */}
                    <td className="p-4 sm:p-6 text-slate-800 leading-relaxed bg-brand-50/10 font-sans">
                      <div className="flex items-start gap-2">
                        <Check className="h-4.5 w-4.5 text-brand-500 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-medium text-slate-900">{row.federal}</span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Table Bottom Action Area */}
          <div className="bg-slate-55 lg:bg-slate-50/50 border-t border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11.5px] font-bold text-slate-600 flex items-center gap-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
              Garantia de 7 dias com devolução direta no PIX se não atender às expectativas.
            </span>
            <button
              onClick={onOpenCheckout}
              className="group rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              id="comparative-action-cta"
            >
              <span>PAGAR AGORA</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
