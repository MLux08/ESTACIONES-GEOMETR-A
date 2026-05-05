import React, { useState } from 'react';
import { StationContainer } from './StationContainer';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FormulaSelector } from '../ui/FormulaSelector';

export default function Station4(props: any) {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');
  const [ans5, setAns5] = useState('');

  const [f1Unlocked, setF1Unlocked] = useState(false);
  const [f2Unlocked, setF2Unlocked] = useState(false);
  const [f3Unlocked, setF3Unlocked] = useState(false);
  const [f4Unlocked, setF4Unlocked] = useState(false);

  // Cuadrado 6cm lado -> 36
  const c1 = ans1 === '36';
  // Rectangulo base 10 alt 5 -> 50
  const c2 = ans2 === '50';
  // Rombo D=4, d=2 -> 4*2/2 = 4
  const c3 = ans3 === '4';
  // Romboide b=7, h=4 -> 28
  const c4 = ans4 === '28';
  // Rect inversa: A=48, b=8 -> h=6
  const c5 = ans5 === '6';

  const canComplete = c1 && c2 && c3 && c4 && c5;

  return (
    <StationContainer
      id={4}
      title="El Mundo de los Paralelogramos (Áreas)"
      objective="Aplicar las fórmulas de área para diferentes cuadriláteros paralelogramos."
      canComplete={canComplete}
      {...props}
    >
      <div className="mb-6 rounded-2xl overflow-hidden relative h-48 sm:h-64 border border-slate-200 shadow-sm w-full bg-emerald-50 flex items-center justify-center p-4">
        <svg viewBox="0 0 500 200" className="w-full h-full max-w-xl drop-shadow-md">
           {/* Cuadrado */}
          <rect x="30" y="60" width="80" height="80" fill="#f43f5e" opacity="0.8" rx="4" />
          <text x="70" y="110" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">Cuadrado</text>

           {/* Rectángulo */}
          <rect x="140" y="70" width="100" height="60" fill="#3b82f6" opacity="0.8" rx="4" />
          <text x="190" y="105" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">Rectángulo</text>

           {/* Rombo */}
          <polygon points="310,40 350,100 310,160 270,100" fill="#10b981" opacity="0.8" strokeLinejoin="round" />
          <line x1="310" y1="40" x2="310" y2="160" stroke="#047857" strokeWidth="2" strokeDasharray="4,4" />
          <line x1="270" y1="100" x2="350" y2="100" stroke="#047857" strokeWidth="2" strokeDasharray="4,4" />
          <text x="310" y="180" fill="#047857" fontSize="12" fontWeight="bold" textAnchor="middle">Rombo</text>
          
           {/* Romboide */}
          <polygon points="390,130 470,130 450,70 370,70" fill="#8b5cf6" opacity="0.8" strokeLinejoin="round" />
          <text x="420" y="110" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">Romboide</text>
        </svg>
      </div>

      <div className="bg-amber-100 text-amber-800 p-4 rounded-xl flex items-start gap-4">
        <span className="text-2xl mt-1">⚠️</span>
        <p className="font-medium">
          ¡Importante! A partir de aquí, todos tus resultados deben expresarse en <strong>unidades cuadradas (cm²)</strong>.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-50 col-span-2 md:col-span-1">
          <CardContent className="p-4 text-center">
            <strong>Cuadrado</strong><br/><span className="font-mono mt-1 block bg-white px-2 py-1 rounded border">Área = l × l</span>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 col-span-2 md:col-span-1">
          <CardContent className="p-4 text-center">
            <strong>Rectángulo</strong><br/><span className="font-mono mt-1 block bg-white px-2 py-1 rounded border">Área = b × h</span>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 col-span-2 md:col-span-1">
          <CardContent className="p-4 text-center">
            <strong>Rombo</strong><br/><span className="font-mono mt-1 block bg-white px-2 py-1 rounded border">Área = (D × d) / 2</span>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 col-span-2 md:col-span-1">
          <CardContent className="p-4 text-center">
            <strong>Romboide</strong><br/><span className="font-mono mt-1 block bg-white px-2 py-1 rounded border">Área = b × h</span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className={cn("transition-colors", c1 ? "bg-emerald-50 border-emerald-200" : "")}>
          <CardContent className="p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              Cuadrado
              {c1 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </h4>
            
            <FormulaSelector 
              options={['A = b × h', 'A = l × l', 'A = (D × d) / 2', 'A = l + l']}
              correctAnswer="A = l × l"
              isUnlocked={f1Unlocked}
              onCorrect={() => setF1Unlocked(true)}
            />

            {f1Unlocked && (
              <>
                <p className="text-slate-600 mb-4">Calcula el área de una baldosa de <strong>6 cm</strong> de lado.</p>
                <div className="flex gap-2 items-center">
                  <Input value={ans1} onChange={e => setAns1(e.target.value)} type="number" className="w-32" />
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
                  Rectángulo
                  {c2 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>

                <FormulaSelector 
                  options={['A = b + h', 'A = l × l', 'A = (b × h) / 2', 'A = b × h']}
                  correctAnswer="A = b × h"
                  isUnlocked={f2Unlocked}
                  onCorrect={() => setF2Unlocked(true)}
                />

                {f2Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Halla la superficie de un sobre cuya base mide <strong>10 cm</strong> y su altura <strong>5 cm</strong>.</p>
                    <div className="flex gap-2 items-center">
                      <Input value={ans2} onChange={e => setAns2(e.target.value)} type="number" className="w-32" />
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
                  Rombo
                  {c3 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>

                <FormulaSelector 
                  options={['A = D × d', 'A = b × h', 'A = (D × d) / 2', 'A = l × l']}
                  correctAnswer="A = (D × d) / 2"
                  isUnlocked={f3Unlocked}
                  onCorrect={() => setF3Unlocked(true)}
                />
                
                {f3Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Un colgante tiene una Diagonal mayor de <strong>4 cm</strong> y una menor de <strong>2 cm</strong>. ¿Cuál es su área?</p>
                    <div className="flex gap-2 items-center">
                      <Input value={ans3} onChange={e => setAns3(e.target.value)} type="number" className="w-32" />
                      <span className="text-slate-500 font-medium">cm²</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {c3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors", c4 ? "bg-emerald-50 border-emerald-200" : "")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  Romboide
                  {c4 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>

                <FormulaSelector 
                  options={['A = (B + b) × h / 2', 'A = (D × d) / 2', 'A = b × h', 'A = b + h']}
                  correctAnswer="A = b × h"
                  isUnlocked={f4Unlocked}
                  onCorrect={() => setF4Unlocked(true)}
                />
                
                {f4Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Calcula el área de un romboide con <strong>7 cm de base</strong> y <strong>4 cm de altura</strong>.</p>
                    <div className="flex gap-2 items-center">
                      <Input value={ans4} onChange={e => setAns4(e.target.value)} type="number" className="w-32" />
                      <span className="text-slate-500 font-medium">cm²</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {c4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors bg-gradient-to-br from-indigo-50 to-purple-50", c5 ? "bg-emerald-50 border-emerald-200 from-emerald-50 to-emerald-100" : "border-indigo-200")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-indigo-800 mb-4 flex items-center justify-between">
                  Desafío Experto Inverso ⭐️
                  {c5 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-700 mb-4">
                  Un rectángulo mágico tiene un Área conocida de <strong>48 cm²</strong> y sabes que su base mide <strong>8 cm</strong>. 
                  Sabiendo que A = b × h, piensa al revés: ¿cuánto mide su altura?
                </p>
                <div className="flex gap-2 items-center">
                  <Input value={ans5} onChange={e => setAns5(e.target.value)} type="number" className="w-32" placeholder="" />
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
