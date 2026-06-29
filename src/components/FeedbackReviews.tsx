/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeedbackReviewsProps {
  onOpenCheckout: () => void;
}

const CAROUSEL_IMAGES = [
  "https://i.imgur.com/xrVk1Ow.png",
  "https://i.imgur.com/kfOLL4d.png",
  "https://i.imgur.com/2N6M0GX.png",
  "https://i.imgur.com/665Fg9Q.png",
  "https://i.imgur.com/PlKawCF.png",
  "https://i.imgur.com/MHPjvpQ.png",
  "https://i.imgur.com/U78CqUW.png",
  "https://i.imgur.com/nAtfkTy.png",
  "https://i.imgur.com/wCO7N7Y.png",
  "https://i.imgur.com/a9dFNqw.png",
  "https://i.imgur.com/ahSDvJ3.png",
  "https://i.imgur.com/sKki2vT.png",
  "https://i.imgur.com/0Y5xFbi.png",
  "https://i.imgur.com/np3Ka2J.png",
  "https://i.imgur.com/xeqUc2y.png",
  "https://i.imgur.com/boKm1iO.png",
  "https://i.imgur.com/r7ilpaH.png",
  "https://i.imgur.com/hTRvgoc.png",
  "https://i.imgur.com/riRMg4q.png",
  "https://i.imgur.com/pvasQrW.png",
  "https://i.imgur.com/XX9ziZU.png",
  "https://i.imgur.com/mNmUNVR.png",
  "https://i.imgur.com/Y0HuHwB.png",
  "https://i.imgur.com/XJb42Oc.png"
];

const VIDEOS = [
  {
    id: 1,
    ytId: 'jwvk3A6AkTg',
    name: 'Marcos Almeida',
    role: 'Motorista de Aplicativo (Uber / 99)',
    location: 'São Paulo - SP',
    badge: 'Ativou eSIM na Hora',
    text: 'Pensei que era golpe por pagar antes, mas ativaram meu eSIM no mesmo dia. Rodo o dia inteiro e o sinal da Vivo é bruto!'
  },
  {
    id: 2,
    ytId: 'yPF8neccGsU',
    name: 'Mariana Costa',
    role: 'Estudante Universitária',
    location: 'Belo Horizonte - MG',
    badge: 'Sem Fidelidade Contratual',
    text: 'Fazer o cadastro associativo foi super rápido. Sem burocracia, sem fidelidade e cancelo quando quiser.'
  },
  {
    id: 3,
    ytId: 'GIJssIoMdf8',
    name: 'Rodrigo Medeiros',
    role: 'Motorista de Aplicativo',
    location: 'Goiânia - GO',
    badge: 'Sem Multas ou Juros',
    text: 'Uso no Uber e funciona perfeitamente quando preciso compartilhar o sinal para o tablet.'
  },
  {
    id: 4,
    ytId: '1v_CvBUkmmw',
    name: 'Cezar Andrade',
    role: 'Trabalho Remoto & Viagem',
    location: 'Rio de Janeiro - RJ',
    badge: 'Suporte Humanizado',
    text: 'O suporte humano pelo Zap é excelente. Me guiaram passo a passo e em 10 minutos já estava navegando.'
  },
  {
    id: 5,
    ytId: '4lOSiXfXnv0',
    name: 'Bruno Silveira',
    role: 'Motorista Particular',
    location: 'Curitiba - PR',
    badge: 'Economia e Liberdade',
    text: 'Economizando mais da metade do meu plano antigo da Claro. Net de alta prioridade 4G/5G.'
  }
];

export default function FeedbackReviews({ onOpenCheckout }: FeedbackReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unmutedVideos, setUnmutedVideos] = useState<Record<number, boolean>>({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeVideo = VIDEOS[currentIndex];

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const unmutedVideosRef = useRef(unmutedVideos);
  unmutedVideosRef.current = unmutedVideos;

  const activeVideoRef = useRef(activeVideo);
  activeVideoRef.current = activeVideo;

  useEffect(() => {
    const playCurrentVideo = () => {
      const currentActiveVideo = activeVideoRef.current;
      if (unmutedVideosRef.current[currentActiveVideo.id] || !isPlayingRef.current) return;
      const iframe = document.getElementById(`ytplayer${currentActiveVideo.id}`) as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }),
          '*'
        );
      }
    };

    // Force play command repeatedly for active video/slider for maximum mobile compatibility
    const interval = setInterval(playCurrentVideo, 1000);

    const handleGesture = () => {
      playCurrentVideo();
    };

    document.addEventListener('touchstart', handleGesture, { passive: true });
    document.addEventListener('click', handleGesture, { passive: true });
    document.addEventListener('scroll', handleGesture, { passive: true });

    return () => {
      clearInterval(interval);
      document.removeEventListener('touchstart', handleGesture);
      document.removeEventListener('click', handleGesture);
      document.removeEventListener('scroll', handleGesture);
    };
  }, []);

  // Auto-rotate the images every 3 seconds with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    // Reset unmuted state before changing video so the button overlay returns
    setUnmutedVideos({});
    setIsPlaying(true);
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const handlePrev = () => {
    // Reset unmuted state before changing video so the button overlay returns
    setUnmutedVideos({});
    setIsPlaying(true);
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  return (
    <section className="bg-white py-14 md:py-20 border-y border-slate-100" id="depoimentos">
      <style>{`
        @keyframes pulseCustom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .animate-pulse-custom {
          animation: pulseCustom 1.4s infinite ease-in-out;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-purple-50 text-brand-700 px-3.5 py-1 rounded-full text-xs font-bold font-sans">
            <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
            Empresa Real — Depoimentos em Vídeo
          </div>
          <h2 className="font-sans font-black tracking-tight text-slate-900 text-3xl sm:text-4xl leading-tight">
            Clientes reais ativando todos os dias
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Veja alguns relatos de pessoas que conseguiram ativar suas linhas sem burocracia.
          </p>
              {/* Grid Container holding both the Video Reviews Carousel and the Real-time Image Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center justify-center max-w-5xl mx-auto">

          {/* Left Column: Video Reviews Carousel */}
          <div className="flex flex-col items-center justify-center">
            
            {/* Main Horizontal Suite containing: Left Arrow, Smartphone Mockup, Right Arrow */}
            <div className="flex items-center justify-center gap-2 sm:gap-6 w-full max-w-md mx-auto">
              
              {/* Left navigation button */}
              <button
                onClick={handlePrev}
                className="bg-purple-50 hover:bg-purple-100 active:scale-95 border border-purple-100 text-brand-700 h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0 hover:shadow"
                aria-label="Vídeo anterior"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3]" />
              </button>

              {/* Smartphone Container using 9/16 aspect ratio in a gorgeous premium mockup */}
              <div className="relative w-full max-w-[240px] sm:max-w-[270px] shrink-0 p-1 bg-gradient-to-tr from-brand-100/10 via-transparent to-purple-100/25 rounded-[3rem]">
                
                {/* Phone Frame wrapper */}
                <div className="relative rounded-[2.8rem] border-[10px] border-slate-900 bg-slate-950 p-2 shadow-2xl overflow-hidden aspect-[9/16]">
                  
                  {/* Simulated Phone Notch */}
                  <div className="absolute top-2.5 left-1/2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-900 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-800 ml-auto mr-3" />
                  </div>

                  {/* Inner Screen Body */}
                  <div className="h-full w-full rounded-[2.1rem] overflow-hidden bg-black flex flex-col justify-between relative text-slate-800">
                    
                    {/* YouTube Player wrapper using key based on activeVideo.id to completely reset iframe on switch */}
                    <div key={activeVideo.id} className="absolute inset-0 w-full h-full bg-black z-0">
                      <div style={{
                        position: 'relative',
                        maxWidth: '420px',
                        margin: 'auto',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        aspectRatio: '9/16',
                        background: '#000',
                        width: '100%',
                        height: '100%'
                      }}>
                        <iframe
                          id={`ytplayer${activeVideo.id}`}
                          src={`https://www.youtube.com/embed/${activeVideo.ytId}?enablejsapi=1&playsinline=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${activeVideo.ytId}&modestbranding=1&rel=0`}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />

                        {unmutedVideos[activeVideo.id] && (
                          <div
                            onClick={() => {
                              const iframe = document.getElementById(`ytplayer${activeVideo.id}`) as HTMLIFrameElement;
                              if (iframe && iframe.contentWindow) {
                                if (isPlaying) {
                                  iframe.contentWindow.postMessage(
                                    JSON.stringify({
                                      event: 'command',
                                      func: 'pauseVideo',
                                      args: []
                                    }),
                                    '*'
                                  );
                                  setIsPlaying(false);
                                } else {
                                  iframe.contentWindow.postMessage(
                                    JSON.stringify({
                                      event: 'command',
                                      func: 'playVideo',
                                      args: []
                                    }),
                                    '*'
                                  );
                                  setIsPlaying(true);
                                }
                              }
                            }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              zIndex: 10,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'transparent'
                            }}
                          >
                            {!isPlaying && (
                              <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.65)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                transition: 'transform 0.2s',
                                border: '1px solid rgba(255,255,255,0.1)'
                              }}>
                                <svg style={{ width: '24px', height: '24px', fill: '#fff', marginLeft: '3px' }} viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}

                        {!unmutedVideos[activeVideo.id] && (
                          <div
                            id={`soundBtn${activeVideo.id}`}
                            onClick={() => {
                              setUnmutedVideos(prev => ({ ...prev, [activeVideo.id]: true }));
                              setIsPlaying(true);
                              const iframe = document.getElementById(`ytplayer${activeVideo.id}`) as HTMLIFrameElement;
                              if (iframe && iframe.contentWindow) {
                                iframe.contentWindow.postMessage(
                                  JSON.stringify({
                                    event: 'command',
                                    func: 'seekTo',
                                    args: [0, true]
                                  }),
                                  '*'
                                );
                                iframe.contentWindow.postMessage(
                                  JSON.stringify({
                                    event: 'command',
                                    func: 'unMute',
                                    args: []
                                  }),
                                  '*'
                                );
                                iframe.contentWindow.postMessage(
                                  JSON.stringify({
                                    event: 'command',
                                    func: 'setVolume',
                                    args: [100]
                                  }),
                                  '*'
                                );
                                iframe.contentWindow.postMessage(
                                  JSON.stringify({
                                    event: 'command',
                                    func: 'playVideo',
                                    args: []
                                  }),
                                  '*'
                                );
                              }
                            }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'rgba(0,0,0,.45)',
                              cursor: 'pointer',
                              zIndex: 10,
                            }}
                          >
                            <div style={{
                              background: '#fff',
                              color: '#000',
                              fontWeight: 800,
                              padding: '16px 28px',
                              borderRadius: '999px',
                              fontSize: '15px',
                              animation: 'pulse 1.4s infinite',
                            }}>
                              🔊 ATIVAR SOM
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Top Phone Info Status Bar */}
                    <div className="relative z-10 flex items-center justify-between font-mono text-[9px] font-bold text-white bg-gradient-to-b from-black/85 to-transparent p-4 pb-12 select-none pointer-events-none">
                      <span>19:57 ⌚</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LTE+ (5G VIP)
                      </span>
                    </div>

                    {/* Bottom overlay details */}
                    <div className="relative z-10 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pt-10 text-white space-y-1.5 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-brand-500/90 text-white text-[9px] px-2 py-0.5 font-extrabold font-sans leading-none">
                          {activeVideo.badge}
                        </span>
                        <span className="text-[9px] text-slate-350 font-bold tracking-wider font-mono">
                          {activeVideo.location}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-sans font-extrabold text-[12.5px] text-white leading-tight flex items-center gap-1">
                          {activeVideo.name}
                          <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                        </h4>
                        <p className="text-[9px] text-slate-300">
                          {activeVideo.role}
                        </p>
                      </div>

                      <p className="text-[10px] text-slate-200 leading-normal font-sans italic line-clamp-2">
                        "{activeVideo.text}"
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* Right navigation button */}
              <button
                onClick={handleNext}
                className="bg-purple-50 hover:bg-purple-100 active:scale-95 border border-purple-100 text-brand-700 h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0 hover:shadow"
                aria-label="Próximo vídeo"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3]" />
              </button>

            </div>

            {/* Bullet Indicators below */}
            <div className="flex gap-2 items-center mt-6">
              {VIDEOS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setUnmutedVideos({});
                    setIsPlaying(true);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Reallocated Dynamic Image Carousel */}
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0 border-t md:border-t-0 border-slate-100/80">
            
            <div className="relative w-full max-w-[240px] sm:max-w-[270px] px-3">
              
              {/* Soft purple glow around slider */}
              <div className="absolute -inset-4 rounded-[4rem] bg-gradient-to-tr from-purple-300/15 via-indigo-300/10 to-transparent blur-2xl pointer-events-none" />

              {/* Minimalist, Clean Modern Card Frame holding the automatic carousel */}
              <div className="relative rounded-[2.5rem] border border-slate-100 bg-slate-950 shadow-2xl overflow-hidden aspect-[9/14] w-full">
                
                {/* Automatic Image Carousel Container with subtle scale-up animation */}
                <div className="w-full h-full relative overflow-hidden bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={CAROUSEL_IMAGES[activeImageIndex]}
                        alt="Cliente do plano ativado feliz"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient Overlay for labels */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-12 p-5 text-white z-10 font-sans">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-sans font-black text-[10px] tracking-widest text-emerald-400 uppercase">
                        ATIVAÇÃO EM ANDAMENTO
                      </span>
                    </div>
                    <h4 className="font-sans font-black text-xs md:text-sm text-white leading-tight">
                      Clientes Reais Ativados Diariamente
                    </h4>
                    <p className="text-[10px] text-slate-350 font-sans mt-1">
                      Linhas instaladas sem nenhuma burocracia para associados de todo o Brasil.
                    </p>
                  </div>

                  {/* Simple Dot indicators overlay */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
                    {CAROUSEL_IMAGES.slice(0, 6).map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          dotIdx === activeImageIndex % 6 ? 'bg-purple-500 scale-125' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                </div>

              </div>

            </div>

            {/* Spacer matching bullet heights for seamless symmetry */}
            <div className="h-2 mt-6 hidden md:block" />

          </div>

        </div>

        </div>

        {/* Section Extra Trust Badges and summary */}
        <div className="max-w-4xl mx-auto border-t border-slate-150/80 pt-10 text-center space-y-6 mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              'Clientes em todo Brasil',
              'Ativações diárias',
              'Atendimento humano',
              'Sem fidelidade'
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 justify-center bg-slate-50 border border-slate-200/50 rounded-full px-4 py-2"
              >
                <span className="text-emerald-500 font-bold shrink-0">✅</span>
                <span className="text-[11.5px] font-bold text-slate-705 text-slate-700 font-sans">{badge}</span>
              </div>
            ))}
          </div>

          <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            “Milhares de clientes já utilizam a ChipLivre Brasil para economizar e navegar com mais liberdade.”
          </p>
        </div>

        {/* CTA Banner suggesting trial */}
        <div className="bg-brand-900 rounded-[2rem] p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm font-bold text-slate-100 flex items-center justify-center md:justify-start gap-1">
              <Sparkles className="h-4 w-4 text-amber-500" /> Faça como mais de 150 mil brasileiros
            </p>
            <p className="text-xs text-brand-200 leading-relaxed max-w-xl">
              Pare de gastar fortunas com faturas que limitam sua internet móvel. Associe-se à ChipLivre Brasil sem compromisso.
            </p>
          </div>
          <button
            onClick={onOpenCheckout}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-sans font-black text-xs py-2.5 px-6 shrink-0 transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-950/25"
            id="reviews-bottom-action"
          >
            PAGAR AGORA
          </button>
        </div>
      </div>
    </section>
  );
}
