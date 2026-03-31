import { useRef, useEffect, useState } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  Database, 
  Megaphone, 
  Mail, 
  BarChart3,
  Cpu,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const automationAreas = [
  {
    icon: MessageCircle,
    title: 'Atendimento inteligente',
    description: 'Respostas automáticas 24/7 em todos os canais',
    color: '#25D366',
  },
  {
    icon: Calendar,
    title: 'Agendamentos automáticos',
    description: 'Sincronização perfeita com sua agenda',
    color: '#ff8c42',
  },
  {
    icon: Database,
    title: 'CRM e pipeline',
    description: 'Gestão automática de leads e oportunidades',
    color: '#4285F4',
  },
  {
    icon: Megaphone,
    title: 'Automação de marketing',
    description: 'Campanhas personalizadas em escala',
    color: '#ff6a00',
  },
  {
    icon: Mail,
    title: 'E-mails automáticos',
    description: 'Sequências inteligentes de nutrição',
    color: '#EA4335',
  },
  {
    icon: BarChart3,
    title: 'Análise de métricas',
    description: 'Dashboards em tempo real para decisões',
    color: '#8b5cf6',
  },
];

export function AutomationMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      // Center hub animation
      gsap.fromTo(
        centerRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.automation-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="servicos"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-orange/5 to-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              Automatizamos{' '}
              <span className="text-gradient">tudo que for possível com IA</span>
            </h2>
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              De ponta a ponta, criamos um ecossistema inteligente que conecta 
              todos os seus processos de vendas e atendimento.
            </p>
          </div>

          {/* Constellation layout */}
          <div className="relative">
            {/* Desktop: Constellation */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Center hub */}
              <div
                ref={centerRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-hevix-orange to-hevix-orange-light flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Cpu className="w-12 h-12 text-white" />
                </div>
                <p className="text-center text-white font-semibold mt-4">Hevix IA</p>
              </div>

              {/* Connection lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ff8c42" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {automationAreas.map((_, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const radius = 180;
                  const cx = 50;
                  const cy = 50;
                  const x = cx + (radius / 500) * 50 * Math.cos(angle);
                  const y = cy + (radius / 500) * 50 * Math.sin(angle);
                  
                  return (
                    <line
                      key={index}
                      x1={`${cx}%`}
                      y1={`${cy}%`}
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="url(#connGradient)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      className={`transition-opacity duration-300 ${
                        hoveredIndex === null || hoveredIndex === index ? 'opacity-100' : 'opacity-30'
                      }`}
                    />
                  );
                })}
              </svg>

              {/* Orbiting cards */}
              {automationAreas.map((area, index) => {
                const angle = (index * 60 - 90) * (Math.PI / 180);
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const Icon = area.icon;

                return (
                  <div
                    key={area.title}
                    className="automation-card absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className={`glass rounded-2xl p-5 border transition-all duration-300 cursor-pointer min-w-[180px] ${
                        hoveredIndex === index
                          ? 'border-hevix-orange/50 scale-110'
                          : 'border-white/5 hover:border-white/20'
                      }`}
                      style={{
                        boxShadow: hoveredIndex === index ? `0 0 30px ${area.color}30` : 'none',
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${area.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: area.color }} />
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1">
                        {area.title}
                      </h3>
                      <p className="text-xs text-hevix-text-secondary">
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile: Grid */}
            <div ref={cardsRef} className="lg:hidden grid sm:grid-cols-2 gap-4">
              {automationAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="automation-card glass rounded-2xl p-5 border border-white/5"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${area.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: area.color }} />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {area.title}
                    </h3>
                    <p className="text-xs text-hevix-text-secondary">
                      {area.description}
                    </p>
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
              className="inline-flex items-center gap-2 text-hevix-orange hover:text-hevix-orange-light font-medium transition-colors group"
            >
              Descubra o que podemos automatizar na sua empresa
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
