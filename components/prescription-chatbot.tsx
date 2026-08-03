'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, CheckCircle2, TrendingUp, AlertTriangle, Info, Send, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Step = 'welcome' | 'upload' | 'analysis' | 'qa';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: React.ReactNode;
  timestamp: Date;
}

export function PrescriptionChatbot() {
  const [step, setStep] = useState<Step>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (role: 'ai' | 'user', content: React.ReactNode) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateTyping = async (content: React.ReactNode, delay = 1000) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    addMessage('ai', content);
    setIsTyping(false);
  };

  // Initial welcome
  useEffect(() => {
    const startFlow = async () => {
      await simulateTyping(
        <div className="space-y-2">
          <p>Hi there! I'm your MediSafe AI Assistant. 👋</p>
          <p>I can help you analyze your prescription for potential risks, dosage clarity, and more.</p>
          <p>Ready to get started?</p>
        </div>
      );
      
      await simulateTyping(
        <div className="space-y-4">
          <p>Please upload a clear photo or PDF of your prescription.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={triggerFileUpload} className="glass">
              <Upload className="w-4 h-4 mr-2" />
              Upload Now
            </Button>
          </div>
        </div>
      );
    };
    
    if (messages.length === 0) {
      startFlow();
    }
  }, []);

  const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
    input.onchange = (e) => {
      const selectedFile = (e.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    };
    input.click();
  };

  const handleFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    addMessage('user', (
      <div className="flex items-center gap-3 glass p-2 rounded-lg">
        <div className="p-2 bg-primary/20 rounded-md">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium truncate max-w-[150px]">{selectedFile.name}</span>
          <span className="text-[10px] opacity-60">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
      </div>
    ));

    setStep('upload');
    await simulateTyping(<p>Got it! Analyzing your prescription now... This usually takes a few seconds. 🔬</p>);
    
    // Simulate processing
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsTyping(false);

    // Show Analysis
    setStep('analysis');
    await simulateTyping(
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-2 text-green-500 font-bold">
          <CheckCircle2 className="w-5 h-5" />
          Analysis Complete
        </div>
        
        <div className="glass-card p-4 bg-primary/5 border-primary/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Prescription Safety Score</span>
            <Badge variant="outline" className="bg-green-500/20 text-green-600 border-green-500/20">LOW RISK</Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">9.2</span>
            <span className="text-muted-foreground">/ 10</span>
          </div>
          <Progress value={92} className="h-2 mt-3" />
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-sm">Summary:</p>
          <ul className="text-sm space-y-1 list-disc pl-4 opacity-90">
            <li>3 medications identified correctly</li>
            <li>No major drug-drug interactions found</li>
            <li>Dosage instructions appear standard</li>
          </ul>
        </div>
      </div>
    );

    await simulateTyping(
      <div className="space-y-2">
        <p>I've also prepared some follow-up questions you might have. Feel free to ask anything!</p>
        <div className="flex flex-wrap gap-2">
          {['What were the medicines?', 'Explain dosage', 'Are there side effects?'].map(q => (
            <Button key={q} variant="outline" size="sm" className="glass h-auto py-2 px-3 text-xs" onClick={() => handleSendMessage(q)}>
              {q}
            </Button>
          ))}
        </div>
      </div>
    );
    setStep('qa');
  };

  const handleSendMessage = async (text?: string) => {
    const message = text || inputValue;
    if (!message.trim()) return;

    addMessage('user', message);
    setInputValue('');
    
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simple mock responses
    let response: React.ReactNode = "That's a great question. Based on common medical knowledge, you should follow your doctor's instructions strictly. Would you like me to clarify a specific part?";
    
    if (message.includes('medicine')) {
      response = (
        <div className="space-y-2">
          <p>I identified these medications:</p>
          <div className="grid gap-2">
            <div className="p-2 glass rounded-md flex items-center gap-3">
              <span className="text-xl">💊</span>
              <div>
                <p className="text-sm font-bold">Amoxicillin 500mg</p>
                <p className="text-xs opacity-70">Antibiotic</p>
              </div>
            </div>
            <div className="p-2 glass rounded-md flex items-center gap-3">
              <span className="text-xl">💊</span>
              <div>
                <p className="text-sm font-bold">Paracetamol 500mg</p>
                <p className="text-xs opacity-70">Pain Reliever</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    addMessage('ai', response);
    setIsTyping(false);
  };

  return (
    <Card className="flex flex-col h-[700px] w-full max-w-4xl mx-auto glass shadow-2xl relative overflow-hidden rounded-3xl border-white/20">
      {/* Header */}
      <div className="p-4 border-b border-white/10 glass bg-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">Prescription AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-medium opacity-70 uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm",
                msg.role === 'user' 
                  ? "bg-primary text-primary-foreground rounded-tr-none ml-12" 
                  : "glass text-foreground rounded-tl-none mr-12"
              )}
            >
              <div className="text-sm md:text-base leading-relaxed">
                {msg.content}
              </div>
              <div className={cn(
                "text-[10px] mt-2 opacity-50",
                msg.role === 'user' ? "text-right" : "text-left"
              )}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="glass text-foreground px-4 py-3 rounded-2xl rounded-tl-none mr-12">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 glass">
        <div className="flex gap-2 items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full flex-shrink-0 hover:bg-white/10"
            onClick={triggerFileUpload}
          >
            <Plus className="w-6 h-6" />
          </Button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <Button 
            size="icon" 
            className="rounded-full flex-shrink-0 bg-primary hover:bg-primary/90 shadow-lg"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function Bot(props: any) {
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
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
