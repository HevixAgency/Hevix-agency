import { useRef, useEffect } from 'react';
import { Clock, XCircle, UserX, TrendingDown, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problemCards = [
  {
    icon: Clock,
    title: 'Demora para responder',
    description: 'Leads esperam horas ou dias por uma resposta, enquanto concorrentes respondem em segundos.',
  },
  {
    icon: XCircle,
    title: 'Esquece follow-ups',
    description: 'Oportunidades quentes esfriam porque ninguém lembra de fazer o acompanhamento.',
  },
  {
    icon: UserX,
    title: 'Trabalho manual',
    description: 'Sua equipe gasta 60% do tempo em tarefas repetitivas que poderiam ser automatizadas.',
  },
  {
    icon: TrendingDown,
    title: 'Processos lentos',
    description: 'Dependência de pessoas cria gargalos que limitam seu crescimento.',
  },
];

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
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
      const cards = cardsRef.current?.querySelectorAll('.problem-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'expo.out',
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
      id="problema"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-500/5 to-transparent" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={titleRef} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-400 font-medium">O problema real</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              O problema não é falta de clientes.
              <br />
              <span className="text-red-400">É falta de automação.</span>
            </h2>
            
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              Você não precisa de mais leads. Você precisa parar de perder os que já chegam.
            </p>
          </div>

          {/* Problem cards grid */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {problemCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="problem-card glass rounded-2xl p-6 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-hevix-text-secondary">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Impact statement */}
          <div className="glass rounded-2xl p-8 text-center border border-red-500/20">
            <p className="text-xl lg:text-2xl text-white mb-4">
              Sua empresa está <span className="text-red-400 font-semibold">deixando dinheiro na mesa</span> todos os dias.
            </p>
            <p className="text-hevix-text-secondary">
              E o pior: você nem consegue medir isso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
