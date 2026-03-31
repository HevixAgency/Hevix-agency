import { useRef, useEffect } from 'react';
import { User, Bot, CheckCircle, UserCheck, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: User,
    title: 'Lead entra',
    description: 'Um novo prospect chega ao seu funil',
    color: '#3b82f6',
  },
  {
    icon: Bot,
    title: 'IA responde instantaneamente',
    description: 'Atendimento imediato, sem espera',
    color: '#ff6a00',
  },
  {
    icon: CheckCircle,
    title: 'IA qualifica',
    description: 'Perguntas estratégicas identificam o perfil',
    color: '#22c55e',
  },
  {
    icon: UserCheck,
    title: 'Agenda automaticamente',
    description: 'Reunião marcada na sua agenda',
    color: '#8b5cf6',
  },
  {
    icon: TrendingUp,
    title: 'Comercial recebe lead pronto',
    description: 'Seu time foca apenas em fechar',
    color: '#ff6a00',
  },
];

export function FutureVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

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

      // Flow steps animation
      const steps = flowRef.current?.querySelectorAll('.flow-step');
      if (steps) {
        gsap.fromTo(
          steps,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: flowRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Connector lines animation
      const connectors = flowRef.current?.querySelectorAll('.connector-line');
      if (connectors) {
        connectors.forEach((line, index) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.4,
              ease: 'expo.out',
              delay: 0.3 + index * 0.15,
              scrollTrigger: {
                trigger: flowRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
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
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-card/20 to-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              Imagine sua empresa funcionando assim:
            </h2>
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              Um fluxo perfeito onde a IA faz o trabalho pesado e seu time 
              foca no que realmente importa: fechar negócios.
            </p>
          </div>

          {/* Flow visualization */}
          <div ref={flowRef} className="relative">
            {/* Desktop horizontal flow */}
            <div className="hidden lg:block">
              <div className="flex items-start justify-between relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === steps.length - 1;
                  
                  return (
                    <div key={step.title} className="flex items-center">
                      <div className="flow-step flex flex-col items-center text-center max-w-[180px]">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: `${step.color}15`,
                            boxShadow: `0 0 20px ${step.color}20`,
                          }}
                        >
                          <Icon className="w-8 h-8" style={{ color: step.color }} />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs text-hevix-text-secondary">
                          {step.description}
                        </p>
                      </div>
                      
                      {!isLast && (
                        <div className="connector-line w-12 h-0.5 bg-gradient-to-r from-hevix-orange/50 to-hevix-orange-light/30 mx-2 origin-left" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile vertical flow */}
            <div className="lg:hidden space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${step.color}15`,
                          boxShadow: `0 0 15px ${step.color}20`,
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: step.color }} />
                      </div>
                      {!isLast && (
                        <div className="w-0.5 h-8 bg-gradient-to-b from-hevix-orange/50 to-hevix-orange-light/30 mt-2" />
                      )}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-base font-semibold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-hevix-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom statement */}
          <div className="mt-16 text-center">
            <div className="inline-block glass rounded-2xl px-8 py-6 border border-hevix-orange/20">
              <p className="text-xl lg:text-2xl font-bold text-white">
                Você não opera.{' '}
                <span className="text-gradient">Você escala.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
