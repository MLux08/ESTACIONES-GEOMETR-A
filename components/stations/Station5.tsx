import React, { useState } from 'react';
import { StationContainer } from './StationContainer';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FormulaSelector } from '../ui/FormulaSelector';

export default function Station5(props: any) {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');

  const [f1Unlocked, setF1Unlocked] = useState(false);
  const [f2Unlocked, setF2Unlocked] = useState(false);

  // pi * r^2. r=4 -> 3.14 * 16 = 50.24
  const c1 = ans1 === '50.24' || ans1 === '50,24';
  
  // moneda r=1.5 -> r^2 = 2.25. 3.14 * 2.25 = 7.065
  const c2 = ans2 === '7.065' || ans2 === '7,065';

  // r=10 -> 314
  const c3 = ans3 === '314';

  // Area = 12.56 -> r=2
  const c4 = ans4 === '2';

  const canComplete = c1 && c2 && c3 && c4;

  return (
    <StationContainer
      id={5}
      title="El Área del Círculo"
      objective="Comprender de dónde viene y calcular el área del círculo."
      canComplete={canComplete}
      {...props}
    >
      <div className="mb-6 rounded-2xl overflow-hidden relative h-48 sm:h-64 border border-slate-200 shadow-sm w-full bg-rose-50 flex items-center justify-center p-4">
        <svg viewBox="0 0 500 200" className="w-full h-full max-w-xl drop-shadow-md">
           {/* Circulo dividido */}
          <g transform="translate(100, 100)">
            <circle cx="0" cy="0" r="70" fill="#fca5a5" opacity="0.5" />
            <line x1="-70" y1="0" x2="70" y2="0" stroke="#e11d48" strokeWidth="1" />
            <line x1="0" y1="-70" x2="0" y2="70" stroke="#e11d48" strokeWidth="1" />
            <line x1="-50" y1="-50" x2="50" y2="50" stroke="#e11d48" strokeWidth="1" />
            <line x1="-50" y1="50" x2="50" y2="-50" stroke="#e11d48" strokeWidth="1" />
            
            <path d="M 0 0 L 70 0 A 70 70 0 0 0 50 -50 Z" fill="#e11d48" opacity="0.8" />
            <line x1="0" y1="0" x2="60" y2="-25" stroke="#fff" strokeWidth="2" />
            <text x="35" y="-10" fill="#fff" fontSize="10" fontStyle="italic">r</text>
          </g>

          {/* Flecha */}
          <defs>
            <marker id="arrow-st5" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>
          <path d="M 190 100 L 230 100" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#arrow-st5)" />

          {/* Transformado en paralelogramo (simulando los trozos) */}
          <g transform="translate(250, 70)">
            <polygon points="20,60 140,60 120,0 0,0" fill="#fca5a5" opacity="0.8" strokeLinejoin="round" />
            <line x1="20" y1="60" x2="20" y2="0" stroke="#e11d48" strokeWidth="2" strokeDasharray="3,3" />
            <text x="10" y="35" fill="#e11d48" fontSize="12" fontWeight="bold">r</text>
            <text x="80" y="75" fill="#e11d48" fontSize="12" fontWeight="bold">π × r</text>
          </g>
        </svg>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-slate-700 leading-relaxed">
            Para entender la fórmula <strong className="font-mono bg-blue-50 px-2 py-1 rounded text-blue-700 mx-1">A = π × r²</strong>, imagina que cortamos un círculo en muchísimas porciones muy finas (como si fueran porciones de pizza). Si las colocamos una al lado de la otra, alternando la dirección, formarán una figura casi idéntica a un <strong>paralelogramo</strong>. 
            Su base sería la mitad de la circunferencia (π × r) y su altura sería el radio (r). ¡De ahí sale la fórmula!
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className={cn("transition-colors", c1 ? "bg-emerald-50 border-emerald-200" : "")}>
          <CardContent className="p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              1. Nivel Básico
              {c1 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </h4>

            <FormulaSelector 
              options={['A = 2 × π × r', 'A = π × r²', 'A = l × l', 'A = (b × h) / 2']}
              correctAnswer="A = π × r²"
              isUnlocked={f1Unlocked}
              onCorrect={() => setF1Unlocked(true)}
            />

            {f1Unlocked && (
              <>
                <p className="text-slate-600 mb-4">Calcula el área de un círculo que tiene un <strong>radio de 4 cm</strong>. (Recuerda usar 3,14)</p>
                <div className="flex gap-2 items-center">
                  <Input value={ans1} onChange={e => setAns1(e.target.value)} placeholder="" type="number" className="w-32" />
                  <span className="text-slate-500 font-medium">cm²</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {c1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors", c2 ? "bg-emerald-50 border-emerald-200" : "")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  2. Nivel Medio
                  {c2 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                
                <FormulaSelector 
                  options={['A = 2 × π × r', 'A = π × r²', 'A = π × d', 'A = 2 × r²']}
                  correctAnswer="A = π × r²"
                  isUnlocked={f2Unlocked}
                  onCorrect={() => setF2Unlocked(true)}
                />

                {f2Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Halla el área de una moneda cuyo radio mide <strong>1,5 cm</strong>.<br/><span className="text-sm text-slate-400">(Recuerda: primero calcula 1,5 × 1,5)</span></p>
                    <div className="flex gap-2 items-center">
                      <Input value={ans2} onChange={e => setAns2(e.target.value)} placeholder="" type="number" className="w-32" />
                      <span className="text-slate-500 font-medium">cm²</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {c2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors", c3 ? "bg-emerald-50 border-emerald-200" : "")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  3. Nivel Avanzado
                  {c3 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-600 mb-4">
                  Una rotonda tiene un radio de <strong>10 metros</strong>. ¿Cuál es su área en metros cuadrados? (Usa π = 3,14)
                </p>
                <div className="flex gap-2 items-center">
                  <Input value={ans3} onChange={e => setAns3(e.target.value)} placeholder="" type="number" className="w-32" />
                  <span className="text-slate-500 font-medium">m²</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {c3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors bg-gradient-to-br from-indigo-50 to-purple-50", c4 ? "bg-emerald-50 border-emerald-200 from-emerald-50 to-emerald-100" : "border-indigo-200")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-indigo-800 mb-4 flex items-center justify-between">
                  Desafío Experto Inverso ⭐️
                  {c4 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-700 mb-4">
                  El área de un sello circular es de <strong>12.56 cm²</strong> (usando π = 3.14). 
                  Piensa al revés para hallar su radio. <br/>
                  <span className="text-sm opacity-75">Pista 1: Primero divide entre 3.14. Pista 2: Busca un número que multiplicado por sí mismo dé ese resultado.</span>
                </p>
                <div className="flex gap-2 items-center">
                  <Input value={ans4} onChange={e => setAns4(e.target.value)} type="number" className="w-32" placeholder="" />
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
