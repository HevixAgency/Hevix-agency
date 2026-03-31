import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import logo from '@/assets/logo.svg';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.6 }
      );
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.9 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <style>{`
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-20px); }
        }
        .logo-float {
          animation: floatLogo 4s ease-in-out infinite;
        }
      `}</style>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-darker to-hevix-dark" />

      {/* Animated background orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,106,0,0.4) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,140,66,0.3) 0%, transparent 70%)',
          transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
            >
              Sua empresa ainda depende de{' '}
              <span className="text-hevix-text-secondary">pessoas</span> para fazer o que a{' '}
              <span className="text-gradient">Inteligência Artificial</span> já resolve sozinha?
            </h1>

            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-hevix-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Enquanto você perde tempo com processos manuais, empresas mais inteligentes estão
              automatizando vendas, atendimento, marketing e operação — e crescendo todos os dias
              com menos esforço.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-hevix-orange hover:bg-hevix-orange-light text-white font-semibold px-8 py-6 rounded-full text-base transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-1 group"
              >
                Quero automatizar minha empresa
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={scrollToForm}
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-base transition-all duration-300"
              >
                Solicitar diagnóstico gratuito
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-hevix-text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Atendimento 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-hevix-orange animate-pulse" />
                <span>Implementação em dias</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Resultados mensuráveis</span>
              </div>
            </div>
          </div>

          {/* Right content - Logo */}
          <div className="hidden lg:flex items-center justify-end xl:-mr-6">
            <img
              src={logo}
              alt="Hevix Agency"
              className="logo-float object-contain"
              style={{
                width: '115%',
                maxWidth: '580px',
                filter:
                  'drop-shadow(0 0 60px rgba(255, 106, 0, 0.35)) drop-shadow(0 0 20px rgba(255, 106, 0, 0.2))',
              }}
            />
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hevix-dark to-transparent" />
    </section>
  );
}