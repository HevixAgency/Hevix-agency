import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.svg';

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Soluções', href: '#solucao' },
  { label: 'Depoimentos', href: '#depoimentos' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToForm = () => {
    const form = document.querySelector('#formulario');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-hevix-dark/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative flex items-center justify-between h-16 lg:h-20">

            {/* Logo - left */}
            <a
              href="#"
              className="flex items-center group shrink-0"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={logo}
                alt="Hevix Agency"
                className="h-12 lg:h-14 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]"
              />
            </a>

            {/* Desktop Navigation - absolutely centered */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-base text-hevix-text-secondary hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hevix-orange group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Button - right */}
            <div className="hidden lg:block shrink-0">
              <Button
                onClick={scrollToForm}
                className="bg-hevix-orange hover:bg-hevix-orange-light text-white font-medium px-6 py-2 rounded-full transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
              >
                Falar com Especialista
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-hevix-dark/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-hevix-card rounded-2xl border border-white/10 p-6 transition-all duration-500 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left text-lg text-hevix-text-secondary hover:text-white transition-colors duration-300 py-2"
              >
                {link.label}
              </button>
            ))}
            <hr className="border-white/10 my-2" />
            <Button
              onClick={scrollToForm}
              className="bg-hevix-orange hover:bg-hevix-orange-light text-white font-medium w-full py-3 rounded-full"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}