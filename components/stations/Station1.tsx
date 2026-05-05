import React, { useState } from 'react';
import { StationContainer } from './StationContainer';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Station1(props: any) {
  const [ans1Base, setAns1Base] = useState('');
  const [ans1Altura, setAns1Altura] = useState('');
  const [ans2Altura, setAns2Altura] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');

  const q1Correct = ans1Base === '4' && ans1Altura === '3';
  const q2Correct = ans2Altura.trim() !== '' && !isNaN(Number(ans2Altura)); // Just need "some" number answer
  const q3Correct = ans3.toLowerCase().includes('si') || ans3.toLowerCase().includes('sí'); // Accept any string containing "si"
  const q4Correct = ans4 === '6';

  const canComplete = q1Correct && q2Correct && q3Correct && q4Correct;

  return (
    <StationContainer
      id={1}
      title="Base y Altura - Explorando las Dimensiones"
      objective="Identificar y medir con precisión la base y la altura en polígonos para comprender la bidimensionalidad."
      canComplete={canComplete}
      {...props}
    >
      <div className="mb-6 rounded-2xl overflow-hidden relative h-48 sm:h-64 border border-slate-200 shadow-sm w-full bg-blue-50 flex items-center justify-center p-4">
        <svg viewBox="0 0 400 200" className="w-full h-full max-w-md drop-shadow-md">
          {/* Rectángulo con base y altura */}
          <rect x="50" y="50" width="120" height="80" fill="#3b82f6" opacity="0.8" rx="4" />
          <line x1="50" y1="140" x2="170" y2="140" stroke="#1e40af" strokeWidth="4" strokeLinecap="round" />
          <text x="110" y="160" fill="#1e40af" fontSize="14" fontWeight="bold" textAnchor="middle">Base</text>
          <line x1="30" y1="50" x2="30" y2="130" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          <text x="20" y="95" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 20, 95)">Altura</text>

          {/* Romboide con altura */}
          <polygon points="250,130 350,130 320,50 220,50" fill="#10b981" opacity="0.8" strokeLinejoin="round" />
          <line x1="250" y1="140" x2="350" y2="140" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
          <text x="300" y="160" fill="#047857" fontSize="14" fontWeight="bold" textAnchor="middle">Base</text>
          <line x1="250" y1="130" x2="250" y2="50" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
          <polyline points="250,120 260,120 260,130" fill="none" stroke="#ef4444" strokeWidth="2" />
        </svg>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-slate-800">Instrucciones:</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong>Base:</strong> Es el lado en el que se apoya la figura. Mídelo apoyando el &quot;0&quot; de la regla en un extremo.</li>
            <li><strong>Altura:</strong> Es la distancia perpendicular desde la base hasta el punto más alto. Para trazarla perfectamente, alinea un cateto de la <strong>escuadra</strong> con la base y deslízala hasta el vértice superior.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className={cn("transition-colors", q1Correct ? "bg-emerald-50 border-emerald-200" : "")}>
          <CardContent className="p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              Ejercicio 1
              {q1Correct && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </h4>
            <p className="text-slate-600 mb-4">En un rectángulo que tiene una <strong>base de 4 cm</strong> y una <strong>altura de 3 cm</strong>, comprueba con tu regla que las medidas son correctas introduciéndolas abajo.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-500 mb-1 block">Base (cm)</label>
                <Input value={ans1Base} onChange={e => setAns1Base(e.target.value)} placeholder="4..." type="number" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 mb-1 block">Altura (cm)</label>
                <Input value={ans1Altura} onChange={e => setAns1Altura(e.target.value)} placeholder="3..." type="number" />
              </div>
            </div>
          </CardContent>
        </Card>

        {q1Correct && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors", q2Correct ? "bg-emerald-50 border-emerald-200" : "")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  Ejercicio 2 (Avanzado)
                  {q2Correct && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-600 mb-4">Imaginate un romboide. Identifica su base y, usando la escuadra, traza su altura desde un vértice. ¿Cuántos centímetros mide en tu mente o en tu papel?</p>
                <Input value={ans2Altura} onChange={e => setAns2Altura(e.target.value)} placeholder="Ej: 5" type="number" />
              </CardContent>
            </Card>
          </div>
        )}

        {q1Correct && q2Correct && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors", q3Correct ? "bg-emerald-50 border-emerald-200" : "")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  Ejercicio 3 (Desafío)
                  {q3Correct && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-600 mb-4">Dibuja un cuadrado de 3 cm de lado. Observa y responde: ¿La altura coincide con uno de sus lados? ¿Por qué?</p>
                <Input value={ans3} onChange={e => setAns3(e.target.value)} placeholder="Sí, coincide porque..." />
              </CardContent>
            </Card>
          </div>
        )}

        {q1Correct && q2Correct && q3Correct && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors bg-gradient-to-br from-indigo-50 to-purple-50", q4Correct ? "bg-emerald-50 border-emerald-200 from-emerald-50 to-emerald-100" : "border-indigo-200")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-indigo-800 mb-4 flex items-center justify-between">
                  Reto Maestro ⭐️
                  {q4Correct && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-700 mb-4">Un triángulo tiene una base de 12 cm. Su altura es exactamente la <strong>mitad</strong> de su base. ¿Cuánto mide su altura?</p>
                <div className="flex gap-2 items-center">
                  <Input value={ans4} onChange={e => setAns4(e.target.value)} placeholder="Ej: 5" type="number" className="w-32" />
                  <span className="text-slate-500 font-medium">cm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </StationContainer>
  );
}
