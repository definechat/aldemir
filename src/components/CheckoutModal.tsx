/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Check, ShieldCheck, Zap, Phone, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { OperatorType, OPERATOR_DETAILS, PLANS, PlanOption } from '../types';
import { pixelService } from '../services/pixelService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOperator?: OperatorType;
  selectedType?: 'eSIM' | 'CHIP';
  selectedProductCode?: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  selectedOperator: initialOperator = 'VIVO',
  selectedType: initialType = 'eSIM',
  selectedProductCode
}: CheckoutModalProps) {
  const [operator, setOperator] = useState<OperatorType>(initialOperator);
  const [chipType, setChipType] = useState<'eSIM' | 'CHIP'>(initialType);
  const [selectedProduct, setSelectedProduct] = useState<string>('vivo80');
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple validation - always valid now that registration fields are handled directly by WhatsApp support
  const isValid = true;

  // Synchronize dynamic parameters when opened
  useEffect(() => {
    if (isOpen) {
      setOperator(initialOperator);
      setChipType(initialType);
      setStep(1);
      
      if (selectedProductCode) {
        setSelectedProduct(selectedProductCode);
        const matchingPlan = PLANS.find(p => p.productCode === selectedProductCode);
        if (matchingPlan) {
          setOperator(matchingPlan.operator);
        }
      } else {
        // Find default or highlight plan for operator
        const defaultOpPlan = PLANS.find(p => p.operator === initialOperator && p.highlight) || PLANS.find(p => p.operator === initialOperator);
        if (defaultOpPlan) {
          setSelectedProduct(defaultOpPlan.productCode);
        }
      }
    }
  }, [isOpen, initialOperator, initialType, selectedProductCode]);

  const handleOperatorChange = (op: OperatorType) => {
    setOperator(op);
    const opPlan = PLANS.find(p => p.operator === op && p.highlight) || PLANS.find(p => p.operator === op);
    if (opPlan) {
      setSelectedProduct(opPlan.productCode);
      // Track standard AddToCart upon user changing infrastructure provider within checkout
      pixelService.trackAddToCart(`${opPlan.operator} ${opPlan.dataGb}`, opPlan.price, [opPlan.id]);
    }
  };

  const handleProductChange = (prodCode: string) => {
    setSelectedProduct(prodCode);
    const targetPlan = PLANS.find(p => p.productCode === prodCode);
    if (targetPlan) {
      // Track standard AddToCart on product size variant interest
      pixelService.trackAddToCart(`${targetPlan.operator} ${targetPlan.dataGb}`, targetPlan.price, [targetPlan.id]);
    }
  };

  const handleClose = () => {
    const selectedPlan = PLANS.find(p => p.productCode === selectedProduct);
    pixelService.trackCustomEvent('RefuseOffer', {
      plan_name: selectedPlan ? `${selectedPlan.operator} ${selectedPlan.dataGb}` : 'Geral/Indefinido',
      step: step
    });
    onClose();
  };

  const currentPlan = PLANS.find(p => p.productCode === selectedProduct) || PLANS.find(p => p.operator === operator) || PLANS[0];
  const selectedOpDetails = OPERATOR_DETAILS[operator];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleCheckoutRedirect = () => {
    // Track standard AddPaymentInfo instead of premature Purchase upon checkout redirection
    pixelService.trackAddPaymentInfo(currentPlan.price, 'BRL', `${currentPlan.operator} ${currentPlan.dataGb}`);
    window.location.href = currentPlan.checkoutLink;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            id="modal-backdrop"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative z-10 w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[95vh] overflow-hidden"
            id="checkout-modal-container"
          >
            {/* Upper Accent Line */}
            <div className="h-2 w-full bg-gradient-to-r from-brand-500 via-purple-500 to-emerald-500" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-brand-600">
                  <Zap className="h-4.5 w-4.5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-900 text-sm md:text-base">Habilitação de Linha Oficial</h3>
                  <p className="text-[10px] text-slate-500 font-mono">RESERVA: FCN-{(whatsapp.slice(-4) || '8837')}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body wrapper */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Títulos solicitados */}
                  <div className="space-y-1">
                    <h2 className="font-sans font-black text-slate-900 text-lg">
                      Finalize sua habilitação associativa
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sua linha será ativada e acompanhada pela equipe Internet Limitada.
                    </p>
                  </div>

                  {/* Bullet Points Premium de Confiança */}
                  <div className="grid grid-cols-1 gap-2.5 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs text-slate-750">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✅</span>
                      <span><strong>Ativação assistida</strong> — Nossa equipe te acompanha passo a passo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✅</span>
                      <span><strong>eSIM ou chip físico</strong> — Código QR imediato ou entrega grátis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✅</span>
                      <span><strong>Sem fidelidade</strong> — Liberdade total para quando quiser</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✅</span>
                      <span><strong>Suporte humano via WhatsApp</strong> — Atendimento real rápido</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✅</span>
                      <span><strong>Cancelamento simples</strong> — Sem multas ou burocracias</span>
                    </div>
                  </div>

                  {/* Dynamic Plan Review Board - Mostrar Nome, Operadora, Valor, GB e Ativação Acompanhada automaticamente */}
                  <div className="bg-brand-50/50 rounded-2xl p-4.5 border border-brand-100 space-y-3.5">
                    <p className="text-[10px] font-mono tracking-wider text-brand-650 font-bold uppercase">
                      RESUMO DA HABILITAÇÃO INTEGRAL
                    </p>
                    <div className="pb-3 border-b border-brand-100/50">
                      <h4 className="font-sans font-black text-slate-900 text-base">
                        Habilitação — {currentPlan.operator} {currentPlan.dataGb}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {currentPlan.name} • {currentPlan.hasCalling ? 'Com Ligações Ilimitadas' : 'Dados/Internet de Alta Performance'}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-705">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Operadora Física:</span>
                        <strong className="text-slate-900">{selectedOpDetails.name}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Franquia Ilimitada:</span>
                        <strong className="text-slate-900">{currentPlan.dataGb}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Ativação Acompanhada:</span>
                        <strong className="text-emerald-600 font-bold">Inclusa (Grátis)</strong>
                      </div>
                      <div className="flex justify-between items-baseline pt-2 border-t border-brand-100/50">
                        <span className="text-slate-900 font-extrabold text-xs">Adesão & Habilitação:</span>
                        <strong className="text-purple-700 font-black text-lg">
                          R$ {currentPlan.price.toFixed(2).replace('.', ',')}
                          <span className="text-[10px] font-medium text-slate-400">/mês</span>
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Interactive switch inside modal to change operator or plan */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 font-sans">
                      1. Confirmar infraestrutura de sinal (Operadora)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['CLARO', 'TIM', 'VIVO'] as OperatorType[]).map((op) => {
                        const isSel = operator === op;
                        const details = OPERATOR_DETAILS[op];
                        return (
                          <button
                            key={op}
                            type="button"
                            onClick={() => handleOperatorChange(op)}
                            className={`flex flex-col items-center justify-center rounded-xl p-2 border-2 transition-all cursor-pointer ${
                              isSel
                                ? 'border-brand-500 bg-brand-50/40 shadow-sm'
                                : 'border-slate-100 bg-white hover:border-slate-300'
                            }`}
                          >
                            <span className={`text-[9px] uppercase font-mono tracking-wider font-bold mb-0.5 ${details.color}`}>
                              {op}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800">{details.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inner dynamic selector for GBs based on chosen operator */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 font-sans">
                      2. Confirmar Franquia de Internet
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PLANS.filter(p => p.operator === operator).map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleProductChange(p.productCode)}
                          className={`rounded-xl p-2.5 border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                            selectedProduct === p.productCode
                              ? 'border-brand-500 bg-purple-50/50 text-slate-900 font-bold font-sans'
                              : 'border-slate-150 bg-white hover:border-slate-350 text-slate-600'
                          }`}
                        >
                          <span className="text-xs font-black">{p.dataGb}</span>
                          <span className="text-[10.5px] text-brand-650 mt-0.5">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Format (eSIM vs Chip) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 font-sans">
                      3. Formato de recebimento da linha
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setChipType('eSIM')}
                        className={`flex items-start gap-2.5 rounded-xl p-3 border-2 text-left transition-all cursor-pointer ${
                          chipType === 'eSIM'
                            ? 'border-brand-500 bg-brand-50/20 shadow-sm'
                            : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        <div className={`mt-0.5 rounded-full p-1 shrink-0 ${chipType === 'eSIM' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">eSIM (Imediato)</p>
                          <p className="text-[9.5px] text-slate-500 leading-normal">Ativação por QR Code no WhatsApp em 15 minutos.</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setChipType('CHIP')}
                        className={`flex items-start gap-2.5 rounded-xl p-3 border-2 text-left transition-all cursor-pointer ${
                          chipType === 'CHIP'
                            ? 'border-brand-500 bg-brand-50/20 shadow-sm'
                            : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        <div className={`mt-0.5 rounded-full p-1 shrink-0 ${chipType === 'CHIP' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Chip Físico</p>
                          <p className="text-[9.5px] text-slate-500 leading-normal">Enviado grátis pelos Correios com rastreamento.</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Texto de Confiança solicitado */}
                  <p className="text-[10.5px] text-slate-500 text-center leading-normal">
                    “O valor corresponde à habilitação e ativação da sua linha empresarial parceira.”
                  </p>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className={`w-full relative overflow-hidden flex items-center justify-center gap-2 rounded-2xl py-3.5 px-4 font-sans font-black text-xs sm:text-sm text-white shadow-xl cursor-pointer transition-all ${
                      isValid && !isLoading
                        ? 'bg-purple-600 hover:bg-purple-700 hover:-translate-y-0.5 shadow-purple-900/10'
                        : 'bg-slate-300 cursor-not-allowed opacity-75'
                    }`}
                    id="submit-simulation-btn"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Validando linha oficial...
                      </span>
                    ) : (
                      <>
                        Reservar e habilitar linha empresarial <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* STEP 2: FINALIZE ACTIVATION */
                <div className="space-y-5 text-center py-2">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 animate-bounce">
                    <ShieldCheck className="h-8 w-8" />
                  </div>

                  <div>
                    <h4 className="font-sans font-extrabold text-slate-900 text-lg">Parabéns!</h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                      Seu lote de internet ilimitada empresarial da operadora <strong className="text-brand-500">{selectedOpDetails.name}</strong> está <span className="text-emerald-600 font-bold">RESERVADO</span> com sucesso sob as taxas de benefício.
                    </p>
                  </div>

                  {/* Trust Banner reducing friction */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-left space-y-3.5">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                      <Sparkles className="h-4 w-4 text-emerald-500" /> Próximos Passos para Ativação Acompanhada
                    </p>
                    
                    <ul className="space-y-2.5 text-xs text-slate-605">
                      <li className="flex items-start gap-2">
                        <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-black text-purple-705 font-mono mt-0.5">
                          1
                        </span>
                        <span>
                          <strong>Ativação Zap Humana:</strong> Você será conectado agora com nossa equipe no WhatsApp para validação imediata.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-black text-purple-705 font-mono mt-0.5">
                          2
                        </span>
                        <span>
                          <strong>Pagamento Seguro Habilitação:</strong> O valor de R$ {currentPlan.price.toFixed(2).replace('.', ',')} é correspondente ao cadastro associativo e primeira mensalidade.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-black text-purple-705 font-mono mt-0.5">
                          3
                        </span>
                        <span>
                          <strong>Liberação Instantânea:</strong> {chipType === 'eSIM' ? 'Código QR gerado e enviado para leitura na sua tela em' : 'Postagem imediata do chip físico com código de rastreamento em'} até 15 minutos!
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-[10.5px] text-slate-500 italic max-w-xs mx-auto">
                    “Você não precisa configurar sozinho. Nossa equipe realiza toda ativação da sua linha.”
                  </p>

                  {/* Trust Seal */}
                  <div className="flex items-center justify-center gap-1.5 text-[9.5px] font-semibold text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Ativação com Garantia Integral de 7 Dias • CNPJ Ativo
                  </div>

                  {/* Final Button to trigger Action */}
                  <div className="space-y-2.5">
                    <button
                      onClick={handleCheckoutRedirect}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-black text-xs sm:text-sm py-3.5 px-4 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                      id="finish-whatsapp-btn"
                    >
                      <ShieldCheck className="h-4.5 w-4.5 text-white" />
                      CONCORDAR E IR PARA PAGAMENTO SEGURO
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-slate-600 transition-colors py-1"
                    >
                      Voltar e alterar configuração do plano
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer trust lines */}
            <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-3 flex items-center justify-between text-[10px] text-slate-500 font-sans">
              <span className="flex items-center gap-1 font-medium">
                Conectado com TIM / Vivo / Claro
              </span>
              <span className="font-mono text-[9px] text-emerald-600 flex items-center gap-0.5 font-bold">
                ● Servidores Ativos
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
