import { useRef, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Ricardo Mendes',
    company: 'TechFlow Solutions',
    role: 'CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Em 3 meses, nossa taxa de conversão aumentou 78%. A IA da Hevix qualifica leads melhor que nossa equipe inteira fazia antes.',
    result: '+78% conversão',
  },
  {
    name: 'Ana Carolina Silva',
    company: 'VendaMais',
    role: 'Diretora Comercial',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'Conseguimos reduzir o tempo de resposta de 4 horas para 30 segundos. Nossos clientes notam a diferença imediatamente.',
    result: '-95% tempo resposta',
  },
  {
    name: 'Marcos Oliveira',
    company: 'Construtora Horizonte',
    role: 'Fundador',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'A automação de follow-ups nos gerou R$ 2.3M em vendas que teríamos perdido. Melhor investimento que fizemos.',
    result: '+R$ 2.3M vendas',
  },
  {
    name: 'Fernanda Costa',
    company: 'Clínica BemEstar',
    role: 'Gestora',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Nossa equipe parou de gastar tempo com confirmações e confirmações. Agora focam no atendimento de qualidade.',
    result: '+40h/semana economizadas',
  },
  {
    name: 'Pedro Henrique',
    company: 'E-commerce Plus',
    role: 'Diretor de Operações',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'Integração perfeita entre WhatsApp, CRM e email. Tudo funciona em harmonia sem intervenção manual.',
    result: '100% integrado',
  },
  {
    name: 'Juliana Martins',
    company: 'Agência Digital Pro',
    role: 'Sócia',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    content: 'Escalamos de 50 para 200 clientes sem contratar ninguém novo. A IA cresce com a gente.',
    result: '4x escala',
  },
];

// Split testimonials into two columns
const column1 = testimonials.filter((_, i) => i % 2 === 0);
const column2 = testimonials.filter((_, i) => i % 2 === 1);

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/5 hover:border-hevix-orange/30 transition-all duration-300 group mb-4">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-hevix-orange/30 mb-4" />
      
      {/* Content */}
      <p className="text-hevix-text-secondary mb-6 text-sm leading-relaxed">
        "{testimonial.content}"
      </p>
      
      {/* Result badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hevix-orange/10 border border-hevix-orange/20 mb-4">
        <Star className="w-4 h-4 text-hevix-orange fill-hevix-orange" />
        <span className="text-sm font-medium text-hevix-orange">
          {testimonial.result}
        </span>
      </div>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-hevix-orange/30"
        />
        <div>
          <p className="font-semibold text-white text-sm">{testimonial.name}</p>
          <p className="text-xs text-hevix-text-muted">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-card/10 to-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              O que nossos clientes{' '}
              <span className="text-gradient">estão dizendo</span>
            </h2>
            <p className="text-lg text-hevix-text-secondary max-w-2xl mx-auto">
              Empresas de todos os tamanhos já transformaram suas operações 
              com a Hevix. Veja alguns resultados reais.
            </p>
          </div>

          {/* Testimonials marquee - Desktop */}
          <div className="hidden lg:block relative h-[600px] overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-hevix-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-hevix-dark to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-4">
              {/* Column 1 - Scrolls up */}
              <div className="flex-1 animate-marquee-up hover:[animation-play-state:paused]">
                {[...column1, ...column1].map((testimonial, index) => (
                  <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
                ))}
              </div>
              
              {/* Column 2 - Scrolls down */}
              <div className="flex-1 animate-marquee-down hover:[animation-play-state:paused]">
                {[...column2, ...column2].map((testimonial, index) => (
                  <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials grid - Mobile */}
          <div className="lg:hidden grid sm:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
