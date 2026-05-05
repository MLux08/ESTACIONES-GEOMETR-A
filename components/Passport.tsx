import React from 'react';
import { AppState } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { CheckCircle2, Circle, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface PassportProps {
  state: AppState;
  onNav: (id: number) => void;
}

const STATION_NAMES = [
  "Base y Altura - Dimensiones",
  "El Misterioso Número π",
  "Longitud de la Circunferencia",
  "El Mundo de los Paralelogramos",
  "El Área del Círculo",
  "El Triángulo y sus Alturas",
  "Desafío de Figuras Compuestas"
];

export default function Passport({ state, onNav }: PassportProps) {
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
          <Star className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Tu Pasaporte Geométrico</h2>
          <p className="text-slate-500 font-medium">Revisa tu progreso y autoevaluación en cada estación.</p>
        </div>
      </div>

      <Card className="border-2 border-slate-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-200">
                  <th className="p-4 font-semibold text-slate-700">#</th>
                  <th className="p-4 font-semibold text-slate-700">Estación</th>
                  <th className="p-4 font-semibold text-slate-700 text-center">Sello de Completado</th>
                  <th className="p-4 font-semibold text-slate-700 text-center">Autoevaluación</th>
                  <th className="p-4 font-semibold text-slate-700">Acción</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7].map((id, idx) => {
                  const stat = state.stations[id];
                  const isCompleted = stat.completed;
                  return (
                    <motion.tr 
                      key={id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 font-bold text-slate-400">{id}</td>
                      <td className="p-4 font-medium text-slate-800">{STATION_NAMES[id - 1]}</td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          {isCompleted ? (
                            <CheckCircle2 className="w-8 h-8 text-emerald-500 drop-shadow-md" />
                          ) : (
                            <Circle className="w-8 h-8 text-slate-200" />
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-1 text-amber-400">
                          {[1, 2, 3].map(star => (
                            <Star 
                              key={star} 
                              strokeWidth={isCompleted && stat.rating >= star ? 0 : 2}
                              className={cn(
                                "w-6 h-6", 
                                isCompleted && stat.rating >= star ? "fill-amber-400" : "text-slate-200"
                              )} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <Button 
                          variant={isCompleted ? "outline" : "primary"} 
                          onClick={() => onNav(id)}
                          className="w-full sm:w-auto text-xs py-1 h-9 rounded-lg gap-2"
                        >
                          {isCompleted ? 'Repasar' : 'Ir a Estación'}
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center bg-slate-800 text-white p-6 rounded-2xl shadow-xl">
        <div>
          <h3 className="font-bold text-lg">¿Todo listo?</h3>
          <p className="text-slate-400 text-sm">Asegúrate de completar y evaluar cada estación.</p>
        </div>
      </div>
    </div>
  );
}
