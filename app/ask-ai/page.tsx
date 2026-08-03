'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/lib/types';

const suggestedQuestions = [
  'What are the side effects of my current medications?',
  'Can I take these medicines together?',
  'What should I do if I miss a dose?',
  'Are there any dietary restrictions with my medications?',
  'When will I see improvements from my medications?',
  'How do I store my medications properly?',
];

export default function AskAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: generateAIResponse(messageText),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const generateAIResponse = (question: string): string => {
    const responses: Record<string, string> = {
      'side effects': 'Common side effects vary by medication. Monitor for dizziness, nausea, or headaches and report any unusual symptoms to your doctor immediately.',
      'together': 'Check with your doctor about drug interactions. Some medications can reduce effectiveness or cause adverse reactions when combined.',
      'miss': 'If you miss a dose, take it as soon as you remember unless it\'s almost time for the next dose. Never double dose.',
      'dietary': 'Some medications should be taken with food, others on an empty stomach. Avoid alcohol and grapefruit with certain medications.',
      'improvements': 'Most medications take 2-4 weeks to show effects. Continue taking as prescribed and monitor progress.',
      'store': 'Store medications at room temperature away from moisture and heat. Keep away from children and pets. Check expiration dates regularly.',
    };

    const lowerQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return 'Based on your prescriptions, I recommend discussing this question with your doctor for personalized advice. Always consult healthcare professionals for medical decisions.';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="space-y-12 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto text-3xl">💬</div>
                <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
                  Ask Your <span className="text-primary italic">AI Pharmacist</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Instant, intelligent answers about your medications, potential side effects, and health schedule.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground text-center">Suggested Topics</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => handleSendMessage(question)}
                      className="glass h-auto p-4 justify-start text-left whitespace-normal hover:bg-primary/10 hover:text-primary transition-all border-white/5 rounded-xl group"
                    >
                      <span className="text-muted-foreground group-hover:text-primary transition-colors mr-3 opacity-50">#</span>
                      <span className="font-medium text-sm">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto w-full pb-10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full ${message.role === 'user' ? 'justify-end pl-12' : 'justify-start pr-12'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  <div
                    className={`px-5 py-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'glass text-foreground rounded-tl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start pr-12 animate-in fade-in">
                  <div className="glass text-foreground px-5 py-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s] text-foreground">.</div>
                      <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s] text-foreground">.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background to-transparent z-40">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-2 flex gap-2 items-center border-white/20 shadow-2xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSendMessage(input);
                }
              }}
              placeholder="Ask anything about your health..."
              disabled={isLoading}
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-sm md:text-base outline-none"
            />
            <Button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-xl h-12 w-12"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 text-center uppercase tracking-widest font-bold opacity-60">
            MediSafe AI provides general info. Consult a doctor for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function Send(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
