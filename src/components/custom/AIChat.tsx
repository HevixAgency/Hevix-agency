import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Olá! Sou o assistente virtual da Hevix. Como posso ajudar você hoje?',
    isUser: false,
    timestamp: new Date(),
  },
];

const quickReplies = [
  'Como funciona?',
  'Quanto custa?',
  'Quanto tempo leva?',
  'Solicitar diagnóstico',
];

const botResponses: Record<string, string> = {
  'como funciona?': 'Nossa implementação segue 4 etapas: 1) Diagnóstico gratuito da sua operação, 2) Estratégia personalizada, 3) Implementação completa (7-14 dias), 4) Otimização contínua. Quer agendar um diagnóstico?',
  'quanto custa?': 'Não trabalhamos com planos fixos. Cada solução é personalizada conforme suas necessidades. O investimento depende da complexidade do projeto. Solicite um diagnóstico gratuito para receber uma proposta sob medida.',
  'quanto tempo leva?': 'O diagnóstico leva 1-2 dias. A estratégia 2-3 dias. A implementação completa geralmente leva entre 7-14 dias. Em poucas semanas, sua operação já está totalmente automatizada!',
  'solicitar diagnóstico': 'Perfeito! Para solicitar seu diagnóstico gratuito, preencha o formulário na página. Nossa equipe entrará em contato em até 24 horas.',
  'default': 'Entendo! Para tirar todas as suas dúvidas e receber uma proposta personalizada, recomendo solicitar nosso diagnóstico gratuito. Posso te direcionar para o formulário?',
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      gsap.fromTo(
        chatContainerRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'expo.out' }
      );
    }
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = botResponses.default;

      for (const key of Object.keys(botResponses)) {
        if (lowerText.includes(key)) {
          responseText = botResponses[key];
          break;
        }
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const scrollToForm = () => {
    const form = document.querySelector('#formulario');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-hevix-card border border-white/20'
            : 'bg-hevix-orange hover:bg-hevix-orange-light shadow-glow hover:shadow-glow-lg'
        }`}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat container */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-hevix-orange to-hevix-orange-light p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Assistente Hevix</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/80">Online agora</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.isUser ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser
                      ? 'bg-hevix-orange/20'
                      : 'bg-white/10'
                  }`}
                >
                  {message.isUser ? (
                    <User className="w-4 h-4 text-hevix-orange" />
                  ) : (
                    <Bot className="w-4 h-4 text-hevix-orange" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    message.isUser
                      ? 'bg-hevix-orange text-white rounded-br-md'
                      : 'bg-white/5 text-hevix-text-secondary rounded-bl-md'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-hevix-orange" />
                </div>
                <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-hevix-orange/50 animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 rounded-full bg-hevix-orange/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-hevix-orange/50 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-hevix-text-secondary hover:bg-hevix-orange/20 hover:text-hevix-orange transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-hevix-text-muted rounded-full h-10 text-sm"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                className="w-10 h-10 rounded-full bg-hevix-orange hover:bg-hevix-orange-light flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="px-4 pb-4">
            <Button
              onClick={scrollToForm}
              variant="outline"
              className="w-full border-hevix-orange/30 text-hevix-orange hover:bg-hevix-orange/10 rounded-full text-sm"
            >
              Quero falar com um especialista
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
