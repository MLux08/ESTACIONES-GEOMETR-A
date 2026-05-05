'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleQuestion, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';

// Note: To use the Gemini API on the client, the NEXT_PUBLIC_GEMINI_API_KEY environment variable must be set.
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: '¡Hola! Soy tu profe de geometría virtual. ¿Tienes alguna duda con las figuras, perímetros o áreas? Puedo explicártelo con ejemplos o analogías para que lo entiendas mejor.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error('No se ha configurado la API Key de Gemini (NEXT_PUBLIC_GEMINI_API_KEY).');
      }

      const formattedHistory = messages.slice(1).map(msg => `${msg.role === 'user' ? 'Alumno' : 'Profesor'}: ${msg.content}`).join('\n');
      const prompt = `Conversación anterior:\n${formattedHistory}\n\nAlumno: ${userMessage}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: `Eres un profesor de matemáticas muy amable, paciente y didáctico para alumnos de 5º de primaria (10-11 años) en España.
Tu objetivo es ayudarles a entender la geometría (bases, alturas, áreas, perímetros, figuras geométricas, el número pi).
Reglas:
- NUNCA les des la respuesta directa o el resultado final de un cálculo. Guíalos para que lo descubran ellos mismos.
- Usa MUCIAS analogías y ejemplos de la vida real (ej: el área es como pintar una pared, el perímetro es como la valla de un jardín, el diámetro es como el ecuador de la Tierra).
- Mantén tus respuestas claras, breves y con un lenguaje accesible para un niño.
- Eres entusiasta y positivo.
- Puedes usar formato Markdown para resaltar cosas importantes.`,
          temperature: 0.7,
        }
      });
      
      const reply = response.text || 'Lo siento, no pude entender eso.';
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
      
    } catch (error: any) {
      console.error("Error generating content:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: `Hubo un pequeño error al contactar al profesor virtual. \n\n*(Error: ${error.message || 'Desconocido'})*`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-white border-2 border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-colors hover:bg-blue-500"
              >
                <MessageCircleQuestion className="w-7 h-7" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-0 right-0 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            >
              <div className="bg-blue-600 p-4 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">Profe Geométrico</h3>
                    <p className="text-[10px] text-blue-100 opacity-90">IA Asistente de estudio</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-blue-100 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex gap-2 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                    <div className={cn(
                      "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm mt-1",
                      msg.role === 'user' ? "bg-slate-800" : "bg-blue-500"
                    )}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      msg.role === 'user' 
                        ? "bg-blue-600 text-white rounded-tr-sm" 
                        : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm"
                    )}>
                      {msg.role === 'user' ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <div className="markdown-body prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-pre:bg-slate-50 prose-pre:text-slate-800 break-words">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 max-w-[80%] mr-auto">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      <span className="text-xs text-slate-500 italic">El profe está pensando...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                <div className="flex gap-2 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu duda aquí..."
                    className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 h-[44px] max-h-[120px]"
                    rows={1}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 top-1.5 bottom-1.5 p-1.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:bg-slate-300 transition-colors hover:bg-blue-700 focus:outline-none"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-400 mt-2">La IA puede cometer errores. Comprueba la información.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
