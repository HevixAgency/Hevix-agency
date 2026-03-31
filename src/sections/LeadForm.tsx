import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Send, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const desafios = [
  { value: 'vendas', label: 'Vendas' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'processos', label: 'Processos internos' },
  { value: 'outro', label: 'Outro' },
];

const faturamentos = [
  { value: 'ate-50k', label: 'Até R$ 50.000/mês' },
  { value: '50k-100k', label: 'R$ 50.000 - R$ 100.000/mês' },
  { value: '100k-500k', label: 'R$ 100.000 - R$ 500.000/mês' },
  { value: '500k-1m', label: 'R$ 500.000 - R$ 1.000.000/mês' },
  { value: 'acima-1m', label: 'Acima de R$ 1.000.000/mês' },
];

export function LeadForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    email: '',
    faturamento: '',
    desafio: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit form');
        // Optionally show error to user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally show error to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section
        ref={sectionRef}
        id="formulario"
        className="relative py-20 lg:py-32"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-3xl p-8 lg:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Diagnóstico solicitado com sucesso!
              </h3>
              <p className="text-hevix-text-secondary mb-6">
                Nossa equipe entrará em contato em até 24 horas para agendar sua 
                consultoria estratégica gratuita.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-hevix-text-muted">
                <Shield className="w-4 h-4" />
                <span>Seus dados estão protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="formulario"
      className="relative py-20 lg:py-32"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-hevix-dark via-hevix-card/30 to-hevix-dark" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Form container */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-hevix-orange/20 via-hevix-orange-light/20 to-hevix-orange/20 rounded-3xl blur-xl opacity-50" />
            
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative glass rounded-3xl p-8 lg:p-12 border border-hevix-orange/20"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Receba um{' '}
                  <span className="text-gradient">diagnóstico estratégico gratuito</span>
                </h2>
                <p className="text-hevix-text-secondary">
                  Descubra como a IA pode transformar sua operação em uma máquina de vendas automática
                </p>
              </div>

              {/* Form fields */}
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-hevix-text-secondary">
                      Nome
                    </Label>
                    <Input
                      id="nome"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-hevix-text-muted focus:border-hevix-orange focus:ring-hevix-orange/20 rounded-xl h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-hevix-text-secondary">
                      Empresa
                    </Label>
                    <Input
                      id="empresa"
                      placeholder="Nome da empresa"
                      value={formData.empresa}
                      onChange={(e) => handleInputChange('empresa', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-hevix-text-muted focus:border-hevix-orange focus:ring-hevix-orange/20 rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-hevix-text-secondary">
                      WhatsApp
                    </Label>
                    <Input
                      id="whatsapp"
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-hevix-text-muted focus:border-hevix-orange focus:ring-hevix-orange/20 rounded-xl h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-hevix-text-secondary">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-hevix-text-muted focus:border-hevix-orange focus:ring-hevix-orange/20 rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-hevix-text-secondary">
                      Faturamento mensal
                    </Label>
                    <Select
                      value={formData.faturamento}
                      onValueChange={(value) => handleInputChange('faturamento', value)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-hevix-orange/20 rounded-xl h-12">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-hevix-card border-white/10">
                        {faturamentos.map((f) => (
                          <SelectItem
                            key={f.value}
                            value={f.value}
                            className="text-white hover:bg-white/10 focus:bg-white/10"
                          >
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-hevix-text-secondary">
                      Principal desafio
                    </Label>
                    <Select
                      value={formData.desafio}
                      onValueChange={(value) => handleInputChange('desafio', value)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-hevix-orange/20 rounded-xl h-12">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-hevix-card border-white/10">
                        {desafios.map((d) => (
                          <SelectItem
                            key={d.value}
                            value={d.value}
                            className="text-white hover:bg-white/10 focus:bg-white/10"
                          >
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-hevix-orange hover:bg-hevix-orange-light text-white font-semibold py-6 rounded-xl text-base transition-all duration-300 hover:shadow-glow group mt-6 disabled:opacity-50"
                >
                  {isLoading ? 'Enviando...' : 'Quero meu diagnóstico personalizado'}
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 text-sm text-hevix-text-muted pt-4">
                  <Shield className="w-4 h-4" />
                  <span>Seus dados estão protegidos. Resposta em até 24h.</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
