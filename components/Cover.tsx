import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { AppState } from '@/lib/types';
import { motion } from 'motion/react';
import { Compass, PenTool, Ruler } from 'lucide-react';

interface CoverProps {
  profile: AppState['profile'];
  updateProfile: (field: keyof AppState['profile'], value: string) => void;
  onNext: () => void;
}

export default function Cover({ profile, updateProfile, onNext }: CoverProps) {
  const isComplete = profile.name && profile.course && profile.date;

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8 py-10">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-emerald-400 to-amber-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
        <Card className="relative border-4 border-white shadow-2xl rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm">
          
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-8 text-center relative overflow-hidden">
            {/* Decors */}
            <div className="absolute -top-10 -right-10 text-white/10">
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
            </div>
            <div className="absolute top-10 -left-10 text-white/10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 20 2 20 12 2"/></svg>
            </div>
            
            <div className="flex justify-center gap-4 mb-6 relative z-10 text-white">
              <Ruler className="w-10 h-10" />
              <Compass className="w-10 h-10" />
              <PenTool className="w-10 h-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-md font-sans tracking-tight" style={{ fontFamily: 'var(--font-sans), "Comic Sans MS", cursive, sans-serif' }}>
              Mi Pasaporte Geométrico
            </h1>
            <p className="text-blue-100 font-medium text-lg mt-2">
              ¡Explora, mide y descubre el mundo que te rodea!
            </p>
          </div>

          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nombre del Investigador/a</label>
                <Input 
                  value={profile.name} 
                  onChange={e => updateProfile('name', e.target.value)} 
                  placeholder="Tu nombre completo..."
                  className="text-lg font-medium border-2 focus-visible:border-blue-500 h-14"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Curso y Grupo</label>
                  <Input 
                    value={profile.course} 
                    onChange={e => updateProfile('course', e.target.value)} 
                    placeholder="Ej: 5º A"
                    className="font-medium border-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Fecha de inicio</label>
                  <Input 
                    type="date"
                    value={profile.date} 
                    onChange={e => updateProfile('date', e.target.value)} 
                    className="font-medium border-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full text-lg h-14 rounded-2xl"
                onClick={onNext}
                disabled={!isComplete}
              >
                ¡Comenzar la Aventura!
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
