import React, { useState } from 'react';
import { StationContainer } from './StationContainer';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FormulaSelector } from '../ui/FormulaSelector';

export default function Station3(props: any) {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');

  const [f1Unlocked, setF1Unlocked] = useState(false);
  const [f2Unlocked, setF2Unlocked] = useState(false);
  const [f3Unlocked, setF3Unlocked] = useState(false);

  // 2 * 3.14 * 5 = 31.4
  const c1 = ans1 === '31.4' || ans1 === '31,4';
  
  // d=12, r=6. 2 * 3.14 * 6 = 37.68
  const c2 = ans2 === '37.68' || ans2 === '37,68';

  // r=35. 2 * 3.14 * 35 = 219.8
  const c3 = ans3 === '219.8' || ans3 === '219,8';
  
  // 125.6 / 6.28 = 20
  const c4 = ans4 === '20';

  const canComplete = c1 && c2 && c3 && c4;

  return (
    <StationContainer
      id={3}
      title="Longitud de la Circunferencia"
      objective="Aprender y aplicar la fórmula matemática para calcular el perímetro de un círculo."
      canComplete={canComplete}
      {...props}
    >
      <div className="mb-6 rounded-2xl overflow-hidden relative h-48 sm:h-64 border border-slate-200 shadow-sm w-full bg-indigo-50 flex items-center justify-center p-4">
        <svg viewBox="0 0 400 200" className="w-full h-full max-w-md drop-shadow-md">
           {/* Círculo con radio marcado */}
          <circle cx="120" cy="100" r="70" fill="#818cf8" opacity="0.2" stroke="#4f46e5" strokeWidth="6" />
          <circle cx="120" cy="100" r="4" fill="#4f46e5" />
          <line x1="120" y1="100" x2="190" y2="100" stroke="#dc2626" strokeWidth="4" />
          <text x="155" y="90" fill="#dc2626" fontSize="16" fontWeight="bold" textAnchor="middle">r</text>

          <path d="M 230 100 L 360 100" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
          <path d="M 230 100 Q 295 50 360 100" stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="5,5" />
          <text x="295" y="60" fill="#dc2626" fontSize="16" fontWeight="bold" textAnchor="middle">2 × π × r</text>
        </svg>
      </div>

      <Card className="bg-blue-600 text-white border-none">
        <CardContent className="p-6 text-center">
          <p className="text-blue-100 mb-2">La fórmula mágica es:</p>
          <div className="text-4xl font-black mb-4">C = 2 × π × r</div>
          <p className="text-sm text-blue-200">
            Recuerda que vamos a usar <strong>3,14</strong> como valor de π (pi).<br/>
            El radio (r) es la mitad del diámetro (d).
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className={cn("transition-colors", c1 ? "bg-emerald-50 border-emerald-200" : "")}>
          <CardContent className="p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              1. El Radio
              {c1 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </h4>

            <FormulaSelector 
              options={['C = π × r', 'C = 2 × π × r', 'C = 2 × r', 'C = π × r²']}
              correctAnswer="C = 2 × π × r"
              isUnlocked={f1Unlocked}
              onCorrect={() => setF1Unlocked(true)}
            />

            {f1Unlocked && (
              <>
                <p className="text-slate-600 mb-4">Calcula la longitud de una circunferencia cuyo <strong>radio es de 5 cm</strong>.</p>
                <div className="flex gap-2 items-center">
                  <Input value={ans1} onChange={e => setAns1(e.target.value)} placeholder="" type="number" className="w-32" />
                  <span className="text-slate-500 font-medium">cm</span>
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
                  2. El Diámetro (Nivel Medio)
                  {c2 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>

                <FormulaSelector 
                  options={['C = 2 × π × d', 'C = π × r²', 'C = π × d', 'C = r × d']}
                  correctAnswer="C = π × d"
                  isUnlocked={f2Unlocked}
                  onCorrect={() => setF2Unlocked(true)}
                />

                {f2Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Si el <strong>diámetro</strong> de un aro es de 12 cm, calcula su longitud (Pista: primero halla el radio).</p>
                    <div className="flex gap-2 items-center">
                      <Input value={ans2} onChange={e => setAns2(e.target.value)} placeholder="" type="number" className="w-32" />
                      <span className="text-slate-500 font-medium">cm</span>
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
                  3. Vida Real (Avanzado)
                  {c3 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>

                <FormulaSelector 
                  options={['C = 2 × π × d', 'C = 2 × π × r', 'C = π × r²', 'C = b × h']}
                  correctAnswer="C = 2 × π × r"
                  isUnlocked={f3Unlocked}
                  onCorrect={() => setF3Unlocked(true)}
                />

                {f3Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Una rueda de bicicleta tiene un radio de 35 cm. ¿Qué distancia recorre la rueda tras dar una vuelta completa?</p>
                    <div className="flex gap-2 items-center">
                      <Input value={ans3} onChange={e => setAns3(e.target.value)} placeholder="" type="number" className="w-32" />
                      <span className="text-slate-500 font-medium">cm</span>
                    </div>
                  </>
                )}
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
                  El borde de una pizza gigante tiene una longitud de <strong>125.6 cm</strong>. 
                  Sabiendo que C = 2 × π × r, y usando π = 3,14, deduce mediante operaciones: ¿cuál es su radio?
                  <br/><span className="text-sm opacity-75">(Pista: Divide la longitud entre 6.28)</span>
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
