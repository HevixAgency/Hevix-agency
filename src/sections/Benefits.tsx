import { useRef, useEffect, useState } from 'react';
import { 
  TrendingDown, 
  Zap, 
  Clock, 
  TrendingUp, 
  Rocket, 
  BarChart3 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: TrendingDown,
    title: 'Redução de custos',
    description: 'Menos desperdício com tarefas manuais',
    stat: '40%',
    statLabel: 'redução média',
  },
  {
    icon: Zap,
    title: 'Mais produtividade',
    description: 'Sua equipe foca no que realmente importa',
    stat: '3x',
    statLabel: 'mais eficiente',
  },
  {
    icon: Clock,
    title: 'Atendimento 24/7',
    description: 'Nunca mais perca uma oportunidade',
    stat: '24/7',
    statLabel: 'sempre online',
  },
  {
    icon: TrendingUp,
    title: 'Mais conversão',
    description: 'Leads qualificados e follow-ups automáticos',
    stat: '65%',
    statLabel: 'aumento médio',
  },
  {
    icon: Rocket,
    title: 'Escala real',
    description: 'Cresça sem aumentar proporcionalmente custos',
    stat: '10x',
    statLabel: 'capacidade',
  },
  {
    icon: BarChart3,
    title: 'Decisões baseadas em dados',
    description: 'Insights em tempo real para estratégia',
    stat: '100%',
    statLabel: 'visibilidade',
  },
];

function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Extract numeric part
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(numericMatch[0]);
    const isPercentage = value.includes('%');
    const hasX = value.includes('x') || value.includes('X');
    
    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: targetNum,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              const current = this.targets()[0].val;
              if (isPercentage) {
                setDisplayValue(Math.round(current) + '%');
              } else if (hasX) {
                setDisplayValue(current.toFixed(0) + 'x');
              } else if (value.includes('/')) {
                setDisplayValue(value);
              } else {
                setDisplayValue(Math.round(current).toString());
              }
            },
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={counterRef} className="text-4xl lg:text-5xl font-bold text-gradient">
      {displayValue}
    </span>
  );
}

export function Benefits() {
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

      // Cards animation
      const cards = gridRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, rotateX: 30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.1,
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
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-orange/5 to-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              Resultados que{' '}
              <span className="text-gradient">transformam negócios</span>
            </h2>
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              Nossos clientes experimentam melhorias significativas em todas 
              as métricas importantes do seu negócio.
            </p>
          </div>

          {/* Benefits grid */}
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ perspective: '1000px' }}
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="benefit-card glass rounded-2xl p-6 border border-white/5 hover:border-hevix-orange/30 transition-all duration-300 group"
                >
                  {/* Stat */}
                  <div className="mb-4">
                    <AnimatedCounter value={benefit.stat} />
                    <p className="text-sm text-hevix-text-muted mt-1">
                      {benefit.statLabel}
                    </p>
                  </div>
                  
                  {/* Icon and title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-hevix-orange/20 to-hevix-orange-light/10 flex items-center justify-center group-hover:shadow-glow-sm transition-shadow">
                      <Icon className="w-5 h-5 text-hevix-orange" />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-hevix-orange transition-colors">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-hevix-text-secondary">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
