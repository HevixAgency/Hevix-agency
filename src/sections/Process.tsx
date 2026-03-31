import { useRef, useEffect } from 'react';
import { Search, Lightbulb, Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico profundo',
    description: 'Analisamos sua operação atual, identificamos gargalos e mapeamos oportunidades de automação com alto impacto.',
    duration: '1-2 dias',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Estratégia personalizada',
    description: 'Criamos um plano sob medida para sua empresa, definindo quais processos automatizar primeiro e como integrar seus sistemas.',
    duration: '2-3 dias',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Implementação completa',
    description: 'Desenvolvemos e implantamos as automações, treinamos sua equipe e garantimos que tudo funcione perfeitamente.',
    duration: '7-14 dias',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Otimização contínua',
    description: 'Monitoramos resultados, ajustamos fluxos e adicionamos novas automações conforme sua operação evolui.',
    duration: 'Contínuo',
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
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

      // Steps animation
      const stepCards = stepsRef.current?.querySelectorAll('.process-step');
      if (stepCards) {
        gsap.fromTo(
          stepCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Connector animation
      const connectors = stepsRef.current?.querySelectorAll('.step-connector');
      if (connectors) {
        gsap.fromTo(
          connectors,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.4,
            ease: 'expo.out',
            stagger: 0.15,
            delay: 0.3,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-card/10 to-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              Não vendemos pacotes.
              <br />
              <span className="text-gradient">Criamos soluções sob medida.</span>
            </h2>
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              Nosso processo é simples, rápido e focado em resultados. 
              Em poucas semanas, sua operação está totalmente automatizada.
            </p>
          </div>

          {/* Steps */}
          <div ref={stepsRef} className="relative">
            {/* Desktop: Horizontal timeline */}
            <div className="hidden lg:block">
              <div className="flex items-start justify-between relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === steps.length - 1;
                  
                  return (
                    <div key={step.number} className="flex items-center">
                      <div className="process-step relative">
                        {/* Card */}
                        <div className="glass rounded-2xl p-6 border border-white/5 hover:border-hevix-orange/30 transition-all duration-300 group w-[260px]">
                          {/* Number badge */}
                          <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-hevix-orange flex items-center justify-center text-white font-bold text-sm">
                            {step.number}
                          </div>
                          
                          {/* Icon */}
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-hevix-orange/20 to-hevix-orange-light/10 flex items-center justify-center mb-4 group-hover:shadow-glow-sm transition-shadow">
                            <Icon className="w-7 h-7 text-hevix-orange" />
                          </div>
                          
                          {/* Content */}
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-hevix-orange transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-sm text-hevix-text-secondary mb-4">
                            {step.description}
                          </p>
                          
                          {/* Duration */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-hevix-text-muted">
                            <span>Duração:</span>
                            <span className="text-hevix-orange">{step.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connector */}
                      {!isLast && (
                        <div className="step-connector w-8 h-0.5 bg-gradient-to-r from-hevix-orange/50 to-hevix-orange-light/30 mx-2 origin-left" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Vertical timeline */}
            <div className="lg:hidden space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={step.number} className="process-step flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-hevix-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {step.number}
                      </div>
                      {!isLast && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-hevix-orange/50 to-hevix-orange-light/30 mt-2" />
                      )}
                    </div>
                    
                    {/* Card */}
                    <div className="flex-1 glass rounded-2xl p-5 border border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hevix-orange/20 to-hevix-orange-light/10 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-hevix-orange" />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-hevix-text-secondary mb-3">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-hevix-text-muted">
                        <span>Duração:</span>
                        <span className="text-hevix-orange">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <a
              href="#formulario"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#formulario')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 bg-hevix-orange hover:bg-hevix-orange-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-glow group"
            >
              Começar meu diagnóstico gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
