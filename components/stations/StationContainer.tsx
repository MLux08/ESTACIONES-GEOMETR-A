import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { RatingSelector } from '../ui/Rating';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface StationContainerProps {
  id: number;
  title: string;
  objective: string;
  completed: boolean;
  rating: number;
  onComplete: () => void;
  onRate: (rate: number) => void;
  onNext: () => void;
  children: React.ReactNode;
  canComplete: boolean;
}

export function StationContainer({ 
  id, title, objective, completed, rating, 
  onComplete, onRate, onNext, children, canComplete 
}: StationContainerProps) {
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">Estación {id}</span>
            {completed && <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Completada</span>}
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-2">{title}</h2>
        </div>
      </div>

      <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-slate-800 text-lg mb-1">🎯 Objetivo:</h3>
          <p className="text-slate-700">{objective}</p>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {children}
      </div>

      <div className="mt-12 space-y-6">
        {canComplete && !completed && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
            <Button size="lg" variant="success" onClick={onComplete} className="h-14 px-8 text-lg rounded-2xl shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Sellar Pasaporte (Completado)
            </Button>
          </motion.div>
        )}

        {completed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-slate-50 border-dashed border-2 border-slate-300">
              <CardContent className="p-6 text-center space-y-4">
                <h4 className="font-bold text-slate-700 text-lg">¿Cómo te has sentido en esta estación?</h4>
                <p className="text-slate-500 text-sm">Evalúa tu aprendizaje para ganar puntos en tu pasaporte.</p>
                <RatingSelector value={rating} onChange={onRate} />
                
                {rating > 0 && (
                  <div className="pt-4 flex justify-between items-center">
                    <Button variant="outline" onClick={() => onNext()} className="gap-2 mx-auto">
                      Siguiente Estación <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
