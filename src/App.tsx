import { useEffect } from 'react';
import { ParticleBackground } from '@/components/custom/ParticleBackground';
import { Navigation } from '@/components/custom/Navigation';
import { AIChat } from '@/components/custom/AIChat';
import { Hero } from '@/sections/Hero';
import { LeadForm } from '@/sections/LeadForm';
import { Problem } from '@/sections/Problem';
import { BeliefBreaker } from '@/sections/BeliefBreaker';
import { Solution } from '@/sections/Solution';
import { FutureVision } from '@/sections/FutureVision';
import { AutomationMap } from '@/sections/AutomationMap';
import { Process } from '@/sections/Process';
import { Benefits } from '@/sections/Benefits';
import { Testimonials } from '@/sections/Testimonials';
import { FinalCTA } from '@/sections/FinalCTA';
import { Footer } from '@/sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-hevix-dark text-white overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Lead Form */}
        <LeadForm />
        
        {/* Problem Section */}
        <Problem />
        
        {/* Belief Breaker */}
        <BeliefBreaker />
        
        {/* Solution Section */}
        <Solution />
        
        {/* Future Vision */}
        <FutureVision />
        
        {/* Automation Map */}
        <AutomationMap />
        
        {/* Process Section */}
        <Process />
        
        {/* Benefits Section */}
        <Benefits />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Final CTA */}
        <FinalCTA />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chat */}
      <AIChat />
    </div>
  );
}

export default App;
