import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, TrendingUp, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Zap, text: 'Implementação em dias' },
  { icon: TrendingUp, text: 'Resultados mensuráveis' },
  { icon: Clock, text: 'Atendimento 24/7' },
];

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Button pulse animation
      gsap.to(buttonRef.current, {
        scale: 1.02,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const form = document.querySelector('#formulario');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-orange/10 to-hevix-dark" />
      
      {/* Radial gradient center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255,106,0,0.2) 0%, transparent 60%)',
        }}
      />
      
      {/* Animated rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[400px] h-[400px] rounded-full border border-hevix-orange/10 animate-pulse" />
        <div className="absolute inset-0 w-[500px] h-[500px] -translate-x-[50px] -translate-y-[50px] rounded-full border border-hevix-orange/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute inset-0 w-[600px] h-[600px] -translate-x-[100px] -translate-y-[100px] rounded-full border border-hevix-orange/5 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <div ref={contentRef} className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hevix-orange/10 border border-hevix-orange/20 mb-8">
              <Sparkles className="w-4 h-4 text-hevix-orange" />
              <span className="text-sm text-hevix-orange font-medium">Vagas limitadas por mês</span>
            </div>
            
            {/* Main headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Você pode continuar operando manualmente…
              <br />
              <span className="text-gradient">ou começar a escalar com IA.</span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-hevix-text-secondary mb-8 max-w-2xl mx-auto">
              Empresas que adotam IA primeiro dominam o mercado. 
              A pergunta é: qual lado você quer estar?
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                  >
                    <Icon className="w-4 h-4 text-hevix-orange" />
                    <span className="text-sm text-hevix-text-secondary">{item.text}</span>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Button */}
            <Button
              ref={buttonRef}
              onClick={scrollToForm}
              size="lg"
              className="bg-hevix-orange hover:bg-hevix-orange-light text-white font-semibold px-10 py-7 rounded-full text-lg transition-all duration-300 hover:shadow-glow-lg group"
            >
              Quero automatizar minha empresa agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* Trust note */}
            <p className="mt-6 text-sm text-hevix-text-muted">
              Diagnóstico gratuito · Resposta em até 24h · Sem compromisso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
