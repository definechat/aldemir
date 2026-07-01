/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DorDoCliente from './components/DorDoCliente';
import ComoFunciona from './components/ComoFunciona';
import FeedbackReviews from './components/FeedbackReviews';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import { PLANS, OperatorType } from './types';
import { pixelService } from './services/pixelService';
import { utmManager } from './tracking/utmManager';
import { capiClient } from './capi/capiClient';
import { Check, ShieldCheck, Sparkles, AlertCircle, Phone } from 'lucide-react';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [modalOperator, setModalOperator] = useState<OperatorType>('VIVO');
  const [modalChipType, setModalChipType] = useState<'eSIM' | 'CHIP'>('eSIM');
  const [selectedProductCode, setSelectedProductCode] = useState<string | undefined>(undefined);
  const [activeOperatorTab, setActiveOperatorTab] = useState<OperatorType>('CLARO');

  const openCheckout = (operator: OperatorType = 'VIVO', chipType: 'eSIM' | 'CHIP' = 'eSIM', productCode?: string) => {
    if (productCode) {
      const matchingPlan = PLANS.find(p => p.productCode === productCode);
      if (matchingPlan) {
        // Track standard InitiateCheckout on explicit checkout intent
        pixelService.trackInitiateCheckout(
          `${matchingPlan.operator} ${matchingPlan.dataGb}`,
          matchingPlan.price,
          [matchingPlan.id]
        );
        // Direct redirection to the matching plan's checkout link
        window.location.href = matchingPlan.checkoutLink;
        return;
      }
    } else {
      // General intent
      pixelService.trackInitiateCheckout('Checkout Geral', 0);
    }

    // Direct redirection to the external registration/onboarding URL
    window.location.href = 'https://cadastro.federalassociadoscadastro.com/?indicador=183837';
  };

  useEffect(() => {
    // Initialize UTMs, TouchStates, visitorId, sessionId, and attribution safely in the browser
    utmManager.initialize();
    
    // Initialize Meta Conversions API (CAPI) client queue flusher
    capiClient.initialize();

    // Check for real WiPay payment approval in the URL query strings
    const params = new URLSearchParams(window.location.search);
    
    // Support multiple possible parameter keys used by gateways for payment states
    const status = (
      params.get('status') ||
      params.get('payment_status') ||
      params.get('wipay_status') ||
      params.get('payment') ||
      params.get('transaction_status')
    )?.toLowerCase();

    // Whitelist approved statuses
    const isApproved = ['approved', 'paid', 'completed', 'success', 'pago', 'aprovado'].includes(status || '');
    
    // Explicit blacklist of pending or unapproved statuses to avoid any false postback
    const isUnapproved = ['pending', 'initiated', 'processing', 'refused', 'canceled', 'pix_generated', 'checkout_open', 'unpaid', 'recusado', 'pendente', 'cancelado'].includes(status || '');

    if (isApproved && !isUnapproved) {
      // Find the specific plan referenced in URL parameters, or fallback to general values if unavailable
      const planRef = params.get('plan') || params.get('produto') || params.get('product') || params.get('productCode');
      const matchedPlan = PLANS.find(p => p.productCode === planRef || p.id === planRef);
      
      const price = matchedPlan ? matchedPlan.price : (Number(params.get('price') || params.get('value') || params.get('valor')) || 80.00);
      const contentName = matchedPlan ? `${matchedPlan.operator} ${matchedPlan.dataGb}` : (params.get('content_name') || 'Assinatura Internet Limitada');
      
      // Deduplicate to prevent double-firing Purchase events on manual page refreshes
      const transactionId = params.get('transaction_id') || params.get('payment_id') || params.get('id') || 'tx_wipay_' + (planRef || 'val') + '_' + price;
      const trackedKey = `cl_tracked_purchase_${transactionId}`;
      
      if (typeof window !== 'undefined' && !window.sessionStorage.getItem(trackedKey)) {
        window.sessionStorage.setItem(trackedKey, 'true');
        
        // Finalized standard Purchase tracking (Meta Pixel + Conversions API via eventManager)
        pixelService.trackPurchase(price, 'BRL', contentName);
        console.info(`[Payment Verification] Verified approved payment status, tracked Purchase for: ${contentName}`);
      }
    }

    // Direct and safe ViewContent tracking upon initial mount
    pixelService.trackViewContent('Landing Page Internet Limitada', 'Planos Ilimitados', 80.00);

    const prod = params.get('produto');
    // Only auto-open checkout if we are not landing from a successful purchase callback
    if (prod && !isApproved) {
      const matched = PLANS.find(p => p.productCode === prod);
      if (matched) {
        setActiveOperatorTab(matched.operator);
        openCheckout(matched.operator, 'eSIM', matched.productCode);
      }
    }
  }, []);

  const handleConsultantClick = () => {
    // Track custom ClickStickyCTA when communicating with the WhatsApp consultant link
    pixelService.trackCustomEvent('ClickStickyCTA', {
      channel: 'WhatsApp',
      target: 'Consultor Especializado'
    });
    window.location.href = `https://wa.me/5544991791576`;
  };

  const handleScrollToPlans = () => {
    const element = document.getElementById('planos-hero-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-500 selection:text-white" id="app-root-container">
      
      {/* Navbar Upper Header */}
      <Navbar onOpenCheckout={handleScrollToPlans} />

      {/* DOBRA 1 — HERO SECTION */}
      <Hero onOpenCheckout={openCheckout} />

      {/* DOBRA 5 — PROVA SOCIAL */}
      <FeedbackReviews onOpenCheckout={handleScrollToPlans} />

      {/* DOBRA 2 — DOR DO CLIENTE */}
      <DorDoCliente onOpenPlans={handleScrollToPlans} />

      {/* SEÇÃO ADICIONAL DE ATIVAÇÃO SEGURA */}
      <section className="border-b border-slate-100 py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* BLOCO DE CONFIANÇA - Novo componente estrito */}
          <div className="border-t border-slate-200/80 pt-12 max-w-4xl mx-auto">
            <h4 className="text-center font-sans font-extrabold text-slate-800 text-xs tracking-widest uppercase mb-8">
              Ativação Segura e Descomplicada do seu eSIM / CHIP
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Suporte humano', desc: 'Atendimento real por especialistas no WhatsApp para te guiar.' },
                { label: 'Ativação acompanhada', desc: 'Nossa equipe realiza todas as configurações técnicas para você.' },
                { label: 'Sem fidelidade', desc: 'Liberdade completa para cancelar ou alterar seus benefícios quando quiser.' },
                { label: 'Sem análise SPC/Serasa', desc: 'Aprovação cadastral associativa irrestrita e imediata para negativados.' },
                { label: 'eSIM disponível', desc: 'Código digital QR Code enviado direto na tela para ativar em 15min.' },
                { label: 'Atendimento via WhatsApp', desc: 'Qualidade excepcional sem filas de espera ou robôs repetitivos.' }
              ].map((item, index) => (
                <div key={index} className="flex gap-3 bg-white p-4 rounded-2xl border border-slate-150 hover:shadow-md transition-all duration-300">
                  <span className="text-lg font-bold text-emerald-500 shrink-0">✅</span>
                  <div>
                    <h5 className="font-sans font-black text-slate-900 text-xs">{item.label}</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Assistance Callout */}
          <div className="mt-14 text-center max-w-xl mx-auto space-y-3.5">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-sans">
              <AlertCircle className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              Precisa de um lote de planos personalizados para a sua empresa?
            </p>
            <button
              onClick={handleConsultantClick}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 cursor-pointer shadow-xs"
              id="custom-plan-zap"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500 stroke-none" />
              Chamar Consultor Especializado pelo Zap
            </button>
          </div>

        </div>
      </section>

      {/* DOBRA 4 — COMO FUNCIONA */}
      <ComoFunciona onOpenCheckout={handleScrollToPlans} />

      {/* DOBRA 6 — CTA FINAL */}
      <section className="bg-gradient-to-tr from-purple-900 via-indigo-950 to-slate-950 text-white py-20 text-center relative overflow-hidden">
        {/* Glowing graphic components for tech finish */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.4),transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 h-56 w-96 rounded-full bg-purple-650/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 space-y-6">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-purple-300">
             Sua Linha Pronta Sem Demora
          </span>
          
          {/* Headline: Pare de pagar caro e ficar preso em fidelidade */}
          <h2 className="font-sans font-black tracking-tight text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            Pare de pagar caro e ficar preso em fidelidade
          </h2>

          <p className="text-purple-100 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Escolha seu plano e fale com nossos especialistas para ativar sua linha hoje mesmo.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl mx-auto py-2.5">
            {[
              'Sem consulta SPC/Serasa',
              'Sem fidelidade',
              'Suporte humano',
              'Ativação rápida'
            ].map((bull, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-100 leading-snug">{bull}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={handleScrollToPlans}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4.5 font-sans font-extrabold text-sm sm:text-base text-white shadow-xl shadow-emerald-600/30 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              id="final-section-cta"
            >
              PAGAR AGORA
            </button>
          </div>

          {/* Secure details indicators footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-purple-200/80 pt-6">
            <span className="flex items-center gap-1.5 border-r border-white/10 pr-4">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Transação Segura SSL
            </span>
            <span className="flex items-center gap-1.5 border-r border-white/10 pr-4">
               CNPJ Registrado Ativo
            </span>
            <span className="flex items-center gap-1.5">
               Garantia de Ativação 100%
            </span>
          </div>
        </div>
      </section>

      {/* Centralized FAQ list for added trust transparency, neat, concise */}
      <FaqSection />

      {/* Terms compliance footer */}
      <Footer />

      {/* Configurator modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedOperator={modalOperator}
        selectedType={modalChipType}
        selectedProductCode={selectedProductCode}
      />

    </div>
  );
}
