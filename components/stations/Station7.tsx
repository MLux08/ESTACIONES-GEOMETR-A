import React, { useState } from 'react';
import { StationContainer } from './StationContainer';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { CheckCircle2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { FormulaSelector } from '../ui/FormulaSelector';

export default function Station7(props: any) {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ansCasa, setAnsCasa] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const [f1Unlocked, setF1Unlocked] = useState(false);
  const [f2Unlocked, setF2Unlocked] = useState(false);

  // L shape: 3x2 (6) + 4x2 (8) = 14
  const c1 = ans1 === '14';
  
  // helado: cuadrado 4x4 (16) + semicirculo r=2 -> pi*2^2 / 2 = 3.14*4/2 = 6.28. 16 + 6.28 = 22.28
  const c2 = ans2 === '22.28' || ans2 === '22,28';

  // casa: (5x5) + (5x4/2) = 25 + 10 = 35
  const c3Casa = ansCasa === '35';
  
  const c4 = fileUploaded;

  const canComplete = c1 && c2 && c3Casa && c4;

  return (
    <StationContainer
      id={7}
      title="Desafío de Figuras Compuestas"
      objective="Descomponer figuras complejas en formas más simples para hallar su área total."
      canComplete={canComplete}
      {...props}
    >
      <div className="mb-6 rounded-2xl overflow-hidden relative h-48 sm:h-64 border border-slate-200 shadow-sm w-full bg-fuchsia-50 flex items-center justify-center p-4">
        <svg viewBox="0 0 500 200" className="w-full h-full max-w-xl drop-shadow-md text-slate-800">
           {/* L Shape */}
          <path d="M 50 140 L 130 140 L 130 100 L 90 100 L 90 60 L 50 60 Z" fill="#d946ef" opacity="0.8" stroke="#a21caf" strokeWidth="2" strokeLinejoin="round" />
          <line x1="50" y1="100" x2="90" y2="100" stroke="#a21caf" strokeWidth="2" strokeDasharray="4,4" />

           {/* Helado */}
          <g transform="translate(250, 100)">
            <path d="M -30 0 A 30 30 0 0 1 30 0 Z" fill="#f43f5e" opacity="0.9" />
            <rect x="-30" y="0" width="60" height="60" fill="#fcd34d" opacity="0.9" rx="4" />
          </g>

           {/* Monstruo Geometrico */}
          <g transform="translate(400, 100)">
            <rect x="-40" y="-20" width="80" height="70" fill="#14b8a6" rx="8" />
            <polygon points="-40,-20 0,-70 40,-20" fill="#8b5cf6" />
            <circle cx="-15" cy="10" r="12" fill="#fff" />
            <circle cx="15" cy="10" r="12" fill="#fff" />
            <circle cx="-15" cy="10" r="4" fill="#000" />
            <circle cx="15" cy="10" r="4" fill="#000" />
            <path d="M -20 35 Q 0 45 20 35" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-bold text-2xl mb-2">¡Has llegado al último nivel! 🏆</h3>
          <p className="text-amber-50">Usa tu ingenio para descomponer estas figuras en formas que ya conoces.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className={cn("transition-colors", c1 ? "bg-emerald-50 border-emerald-200" : "")}>
          <CardContent className="p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              Nivel Básico
              {c1 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </h4>

            <FormulaSelector 
              options={['A = (b1×h1) + (b2×h2)', 'A = 2 × (b × h)', 'A = l × l × l', 'A = (b1+b2) × h']}
              correctAnswer="A = (b1×h1) + (b2×h2)"
              isUnlocked={f1Unlocked}
              onCorrect={() => setF1Unlocked(true)}
            />

            {f1Unlocked && (
              <>
                <p className="text-slate-600 mb-4">
                  Una habitación tiene forma de &quot;L&quot;. Puedes dividirla en <strong>dos rectángulos</strong>. 
                  Si uno mide <strong>3 × 2 cm</strong> y el otro <strong>4 × 2 cm</strong>, ¿cuál es el área total?
                </p>
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
                  Nivel Avanzado
                  {c2 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                
                <FormulaSelector 
                  options={['A = (l × l) + (π × r²)/2', 'A = (b × h) + π × r²', 'A = l × (π × r) / 2', 'A = l × l + (b × h)/2']}
                  correctAnswer="A = (l × l) + (π × r²)/2"
                  isUnlocked={f2Unlocked}
                  onCorrect={() => setF2Unlocked(true)}
                />

                {f2Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">
                      Imagina un helado dibujado con un <strong>cuadrado</strong> de 4 cm de lado y, justo encima, un <strong>semicírculo</strong> (la mitad de un círculo). 
                      Calcula el área de cada parte y súmalas. (Usa π = 3.14)
                    </p>
                    <div className="flex gap-2 items-center">
                      <Input value={ans2} onChange={e => setAns2(e.target.value)} type="number" className="w-32" placeholder="" />
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
            <Card className={cn("transition-colors bg-gradient-to-br from-indigo-50 to-purple-50", c3Casa ? "bg-emerald-50 border-emerald-200 from-emerald-50 to-emerald-100" : "border-indigo-200")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-indigo-800 mb-4 flex items-center justify-between">
                  Desafío Experto: La Casa ⭐️
                  {c3Casa && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-700 mb-4">
                  Dibuja una casa: su base es un <strong>cuadrado</strong> de 5x5 cm. Su tejado es un <strong>triángulo</strong> apoyado justo encima, cuya base es 5 cm y su altura es 4 cm. 
                  ¿Cuál es el área total de la casa?
                </p>
                <div className="flex gap-2 items-center">
                  <Input value={ansCasa} onChange={e => setAnsCasa(e.target.value)} type="number" className="w-32" placeholder="" />
                  <span className="text-slate-500 font-medium">cm²</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {c3Casa && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn("transition-colors", c4 ? "bg-emerald-50 border-emerald-200" : "")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  Reto Final: ¡Crea tu Monstruo!
                  {c4 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Dibuja tu propia <strong>&quot;Figura Monstruo&quot;</strong> en tu cuaderno. Debe tener al menos: 
                  un triángulo, un cuadrado y un círculo (o parte de uno). <br/>
                  Ponle medidas realistas, calcula el área de cada pieza por separado y halla el <strong>Área Total</strong>.
                </p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => setFileUploaded(true)}>
                  {!fileUploaded ? (
                    <>
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8" />
                      </div>
                      <h5 className="font-medium text-slate-700 mb-1">Pulsa aquí para &quot;subir&quot; tu obra</h5>
                      <p className="text-xs text-slate-500 mb-4">Sube una foto de tu cuaderno para completar el reto</p>
                      <Button variant="outline" size="sm">Seleccionar imagen</Button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h5 className="font-bold text-emerald-700">¡Reto conseguido!</h5>
                      <p className="text-sm text-emerald-600">Has enviado tu figura monstruo</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {canComplete && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-6 rounded-2xl text-center shadow-lg transform -rotate-1 mt-8">
          <h2 className="text-2xl font-black mb-2 uppercase tracking-wide">¡Felicidades, Investigador/a!</h2>
          <p className="font-medium text-lg">Has completado el circuito de estaciones. Ahora la geometría no tiene secretos para ti. ¡Sigue explorando!</p>
        </div>
      )}
    </StationContainer>
  );
}
