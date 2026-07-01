/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Sparkles, Phone, Mail, FileText, CheckCircle2, Cpu, Wifi } from 'lucide-react';

export default function Footer() {
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans text-xs border-t border-slate-800" id="app-footer">
      
      {/* Upper Footer Segment */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/XkjH9IQ.png" 
                alt="INTERNET ILIMITADA Logo" 
                className="h-10 w-auto object-contain bg-slate-900/40 p-1 rounded-lg" 
                referrerPolicy="no-referrer" 
              />
              <span className="font-sans font-black tracking-tight text-white text-base">
                INTERNET ILIMITADA
              </span>
            </div>
            
            <p className="text-slate-400 leading-normal max-w-sm text-[11.5px]">
              Associação de Conectividade Corporativa de Alto Nível. Fornecemos internet móvel ilimitada original, de alta prioridade corporativa, com total segurança jurídica e conformidade regulatória.
            </p>

            <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
              <CheckCircle2 className="h-4 w-4 text-emerald-555 text-emerald-500" />
              <span>Homologado em Conformidade com a ANATEL</span>
            </div>
          </div>

          {/* Column 2: Legal links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-white text-[12.5px] uppercase tracking-wider">Políticas & Contratos</h4>
            <ul className="space-y-2 text-[11px] text-slate-450">
              <li>
                <a href="#termos" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Termos de Associação Coletiva
                </a>
              </li>
              <li>
                <a href="#privacidade" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Diretrizes de Privacidade LGPD
                </a>
              </li>
              <li>
                <a href="#garantia" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Política de Garantia e Reembolso
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-sans font-bold text-white text-[12.5px] uppercase tracking-wider">Canais Oficiais</h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-brand-400" />
                <span>WhatsApp: (44) 99179-1576</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-brand-400" />
                <span>E-mail: contato@internetilimitadabrasil.com</span>
              </li>
              <li className="font-mono text-[10px] text-slate-500">
                Intermediador Autorizado: Licineide Coli De Pontes<br />
                CNPJ: 45.147.258/0001-53
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Disclaimer Statement - EXTREMELY IMPORTANT for legal legitimacy */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-400 text-[11px] leading-relaxed">
            <p className="text-justify font-sans">
              Intermediador de Negócios Autorizado - Licineide Coli De Pontes (CNPJ: 45.147.258/0001-53) email: <a href="mailto:contato@internetilimitadabrasil.com" className="text-brand-400 hover:underline">contato@internetilimitadabrasil.com</a> whats app <a href="https://wa.me/5544991791576" target="_blank" rel="noreferrer" className="text-brand-400 hover:underline">(44) 99179-1576</a>. A prestação dos serviços de telefonia, entrega do sinal de internet e suporte técnico oficial é de responsabilidade exclusiva da provedora Federal Associados (CNPJ: 35.215.115/0001-31 | Suporte SAC: 0800 200 0038).
            </p>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed font-sans text-justify">
            <strong>Aviso de Isenção e Esclarecimento de Parceria:</strong> A INTERNET ILIMITADA é uma associação independente que contrata e gerencia linhas corporativas empresariais com permissão regulatória de revenda para seus associados sob as diretrizes vigentes das telecomunicações brasileiras. As marcas TIM, Vivo e Claro, bem como seus respectivos logotipos e nomes, são marcas registradas de suas respectivas operadoras concessionárias móveis. A INTERNET ILIMITADA não possui vínculo societário direto com as operadoras citadas, operando apenas como cliente final corporativa (através de lotes) e repassando o sinal original físico de rede emitido pelas concessionárias, garantindo o funcionamento estrito sem VPN nas antenas físicas originais.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 border-t border-slate-800/60 pt-4">
            <span>© {currentYear} INTERNET ILIMITADA. Todos os direitos reservados.</span>
            <div className="flex items-center gap-1">
              <span>Desenvolvido com tecnologia de ponta</span>
              <Sparkles className="h-3 w-3 text-brand-400" />
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
}
