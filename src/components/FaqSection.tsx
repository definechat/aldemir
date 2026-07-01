/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle, Phone, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../types';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1'); // Default to first open for user curiosity

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleWhatsappSupport = () => {
    const text = encodeURIComponent("Olá ChipLivre Brasil! Tenho algumas dúvidas extras sobre a internet ilimitada empresarial antes de assinar. Pode me atender?");
    window.location.href = `https://wa.me/5544991791576?text=${text}`;
  };

  return (
    <section className="bg-slate-50/65 py-16 md:py-24 border-t border-slate-100/50" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Title details */}
        <div className="text-center space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">
            <HelpCircle className="h-4 w-4 text-brand-500" />
            Central de Respostas Rápidas
          </div>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Selecione uma dúvida abaixo para entender nossa operação transparente de associação móvel corporativa.
          </p>
        </div>

        {/* Faq Accordion List */}
        <div className="space-y-3.5 mb-12">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-150/70 bg-white shadow-xs overflow-hidden transition-all duration-200"
                id={`faq-accordion-box-${item.id}`}
              >
                
                {/* Accordion Trigger Header Button */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-sans font-bold text-slate-850 hover:bg-slate-50/50 transition-colors text-xs sm:text-sm md:text-base cursor-pointer"
                  id={`faq-trigger-${item.id}`}
                >
                  <span className="pr-4 leading-snug">{item.question}</span>
                  <div className={`rounded-full p-1 bg-slate-50 border border-slate-100 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-brand-50 border-brand-100 text-brand-500' : ''}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Accordion Content Box (Animate height toggle with motion/react) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="border-t border-slate-100"
                    >
                      <div className="p-4.5 sm:p-5 bg-slate-50/40 text-slate-600 text-xs sm:text-[13px] leading-relaxed font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Support Redirect Callout Block */}
        <div className="rounded-3xl bg-brand-900 text-white p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-bold flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="h-4 w-4 text-amber-400" /> Ficou com alguma dúvida específica?
            </p>
            <p className="text-[11.5px] text-brand-200 leading-relaxed max-w-lg">
              Sem problemas! Nós temos consultores humanos dedicados prontos para te atender no WhatsApp de forma rápida e clara. Sem compromissos.
            </p>
          </div>
          
          <button
            onClick={handleWhatsappSupport}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-extrabold text-xs py-2.5 px-5 shadow-md shadow-emerald-500/10 transition-all shrink-0 cursor-pointer"
            id="faq-whatsapp-cta"
          >
            <Phone className="h-4 w-4 fill-white stroke-none" />
            Falar com Consultor no Zap
          </button>
        </div>

      </div>
    </section>
  );
}
