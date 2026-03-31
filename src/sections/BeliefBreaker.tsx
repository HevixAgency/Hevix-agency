import { useRef, useEffect } from 'react';
import { X, Users, Clock, Megaphone, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const beliefs = [
  { icon: Users, text: 'Contratar mais pessoas', highlight: 'não resolve.' },
  { icon: Clock, text: 'Trabalhar mais horas', highlight: 'não resolve.' },
  { icon: Megaphone, text: 'Postar mais', highlight: 'não resolve.' },
];

export function BeliefBreaker() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lines animation with scroll
      const lines = linesRef.current?.querySelectorAll('.belief-line');
      if (lines) {
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Solution animation
      gsap.fromTo(
        solutionRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: solutionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-orange/5 to-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Belief lines */}
          <div ref={linesRef} className="space-y-6 mb-12">
            {beliefs.map((belief) => {
              const Icon = belief.icon;
              return (
                <div
                  key={belief.text}
                  className="belief-line flex items-center gap-4 lg:gap-6"
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-red-400" />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xl lg:text-3xl font-bold text-hevix-text-secondary">
                      {belief.text}
                    </span>
                    <span className="text-xl lg:text-3xl font-bold text-red-400 flex items-center gap-2">
                      <X className="w-6 h-6 lg:w-8 lg:h-8" />
                      {belief.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-hevix-orange/30 to-transparent" />
            <Sparkles className="w-6 h-6 text-hevix-orange" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-hevix-orange/30 to-transparent" />
          </div>

          {/* Solution */}
          <div
            ref={solutionRef}
            className="text-center"
          >
            <p className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
              O que resolve é{' '}
              <span className="text-gradient">automatizar com IA.</span>
            </p>
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              Sistemas inteligentes que trabalham 24 horas por dia, 7 dias por semana, 
              sem pausas, sem férias e sem perder oportunidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
