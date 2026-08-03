'use client';

import { PrescriptionChatbot } from '@/components/prescription-chatbot';
import { Navbar } from '@/components/navbar';

export default function UploadPrescriptionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-1000">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Prescription <span className="text-primary italic">AI Assistant</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload and analyze your prescriptions in a seconds with our intelligent chatbot.
            </p>
          </div>
          
          <PrescriptionChatbot />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { icon: '🔒', title: 'Private & Secure', desc: 'Your data is encrypted and never shared.' },
              { icon: '⚡', title: 'Instant Analysis', desc: 'Get results in seconds using advanced AI.' },
              { icon: '🤖', title: 'Smart Guidance', desc: 'Ask any questions about your medications.' },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 text-center space-y-2">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
