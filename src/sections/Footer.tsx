import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const footerLinks = {
  servicos: [
    { label: 'Automação de Vendas', href: '#servicos' },
    { label: 'Atendimento com IA', href: '#servicos' },
    { label: 'Integração de Sistemas', href: '#servicos' },
    { label: 'Análise de Dados', href: '#servicos' },
    { label: 'Desenvolvimento Web/SaaS', href: '#servicos' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '#' },
  ],
};

const socialLinks = [
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    href: 'https://wa.me/558196456577',
    label: 'WhatsApp',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/hevix.agency',
    label: 'Instagram',
  },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 lg:py-20 border-t border-white/5">
      <div className="absolute inset-0 bg-hevix-dark" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-4 gap-12 mb-12">

            {/* BRAND */}
            <div className="lg:col-span-2">

              {/* 🔥 Logo + Nome ajustado */}
              <a href="#" className="flex items-center mb-6">

                <img
                  src="/dist/assets/logo.svg"
                  alt="Hevix Agency"
                  className="h-12 w-auto"
                />

                <span className="text-white text-lg font-semibold tracking-wide">
                  Hevix Agency
                </span>

              </a>

              <p className="text-hevix-text-secondary mb-6 max-w-sm">
                Transformamos empresas em máquinas de vendas automáticas
                através da Inteligência Artificial.
              </p>

              {/* CONTATO */}
              <div className="space-y-3">
                <a
                  href="mailto:hevixagency@gmail.com"
                  className="flex items-center gap-3 text-hevix-text-secondary hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-hevix-orange" />
                  <span className="text-sm">hevixagency@gmail.com</span>
                </a>

                <a
                  href="tel:+558196456577"
                  className="flex items-center gap-3 text-hevix-text-secondary hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-hevix-orange" />
                  <span className="text-sm">(81) 96456-577</span>
                </a>

                <div className="flex items-center gap-3 text-hevix-text-secondary">
                  <MapPin className="w-4 h-4 text-hevix-orange" />
                  <span className="text-sm">Recife, PE - Brasil</span>
                </div>
              </div>
            </div>

            {/* SERVIÇOS */}
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

            {/* EMPRESA */}
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

          </div>

          {/* BOTTOM */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-hevix-text-muted">
              © 2026 Hevix Agency. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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