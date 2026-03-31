import { useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Filter, 
  CalendarCheck, 
  Database, 
  Repeat, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageSquare,
    title: 'Respondem clientes automaticamente',
    description: 'Atendimento instantâneo 24/7 em todos os canais.',
  },
  {
    icon: Filter,
    title: 'Qualificam leads',
    description: 'Identificação automática dos prospects mais promissores.',
  },
  {
    icon: CalendarCheck,
    title: 'Agendam reuniões',
    description: 'Sincronização inteligente com sua agenda.',
  },
  {
    icon: Database,
    title: 'Alimentam CRM',
    description: 'Dados organizados e atualizados automaticamente.',
  },
  {
    icon: Repeat,
    title: 'Executam follow-ups',
    description: 'Acompanhamento persistente até a conversão.',
  },
  {
    icon: BarChart3,
    title: 'Analisam dados',
    description: 'Insights em tempo real para decisões estratégicas.',
  },
];

export function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid animation
      const cards = gridRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="solucao"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-hevix-orange/5 blur-3xl -translate-y-1/2" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              Nós não criamos chatbots.
              <br />
              <span className="text-gradient">Construímos operações inteligentes.</span>
            </h2>
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              Implementamos sistemas completos de automação com IA que transformam 
              sua empresa em uma máquina de vendas automática.
            </p>
          </div>

          {/* Features grid */}
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ perspective: '1000px' }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="feature-card glass rounded-2xl p-6 border border-white/5 hover:border-hevix-orange/30 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-hevix-orange/20 to-hevix-orange-light/10 flex items-center justify-center mb-4 group-hover:shadow-glow-sm transition-shadow duration-300">
                    <Icon className="w-7 h-7 text-hevix-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-hevix-orange transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-hevix-text-secondary">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-hevix-text-secondary mb-4">
              Tudo funcionando 24h por dia, sem parar.
            </p>
            <a
              href="#formulario"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#formulario')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-hevix-orange hover:text-hevix-orange-light font-medium transition-colors group"
            >
              Quero conhecer as soluções
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
