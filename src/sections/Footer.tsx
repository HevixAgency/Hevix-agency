import { Zap, Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  servicos: [
    { label: 'Automação de Vendas', href: '#servicos' },
    { label: 'Atendimento com IA', href: '#servicos' },
    { label: 'Integração de Sistemas', href: '#servicos' },
    { label: 'Análise de Dados', href: '#servicos' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '#' },
    { label: 'Cases', href: '#depoimentos' },
    { label: 'Blog', href: '#' },
    { label: 'Carreiras', href: '#' },
  ],
  suporte: [
    { label: 'Documentação', href: '#' },
    { label: 'Contato', href: '#formulario' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-16 lg:py-20 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 mb-12">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-hevix-orange to-hevix-orange-light flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">hevix</span>
              </a>
              <p className="text-hevix-text-secondary mb-6 max-w-sm">
                Transformamos empresas em máquinas de vendas automáticas 
                através da Inteligência Artificial.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <a
                  href="mailto:contato@hevix.com.br"
                  className="flex items-center gap-3 text-hevix-text-secondary hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-hevix-orange" />
                  <span className="text-sm">contato@hevix.com.br</span>
                </a>
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-3 text-hevix-text-secondary hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-hevix-orange" />
                  <span className="text-sm">(11) 99999-9999</span>
                </a>
                <div className="flex items-center gap-3 text-hevix-text-secondary">
                  <MapPin className="w-4 h-4 text-hevix-orange" />
                  <span className="text-sm">São Paulo, SP - Brasil</span>
                </div>
              </div>
            </div>

            {/* Links columns */}
            <div>
              <h4 className="text-white font-semibold mb-4">Serviços</h4>
              <ul className="space-y-3">
                {footerLinks.servicos.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-hevix-text-secondary hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-hevix-text-secondary hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-3">
                {footerLinks.suporte.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-hevix-text-secondary hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-hevix-text-muted">
              © 2025 Hevix. Todos os direitos reservados.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-hevix-text-secondary hover:bg-hevix-orange hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
