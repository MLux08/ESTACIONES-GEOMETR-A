import React, { useState } from 'react';
import { StationContainer } from './StationContainer';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FormulaSelector } from '../ui/FormulaSelector';

export default function Station6(props: any) {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');

  const [f1Unlocked, setF1Unlocked] = useState(false);
  const [f2Unlocked, setF2Unlocked] = useState(false);
  const [f3Unlocked, setF3Unlocked] = useState(false);

  // b=8, h=5 -> 8*5/2 = 20
  const c1 = ans1 === '20';
  // rect, h=4, b=6 -> 4*6/2 = 12
  const c2 = ans2 === '12';
  // b=5, h(ext)=6 -> 5*6/2 = 15
  const c3 = ans3 === '15';
  // area=30, h=6 -> b=10
  const c4 = ans4 === '10';

  const canComplete = c1 && c2 && c3 && c4;

  return (
    <StationContainer
      id={6}
      title="El Triángulo y sus Alturas"
      objective="Descubrir cómo calcular el área de cualquier tipo de triángulo."
      canComplete={canComplete}
      {...props}
    >
      <div className="mb-6 rounded-2xl overflow-hidden relative h-48 sm:h-64 border border-slate-200 shadow-sm w-full bg-cyan-50 flex items-center justify-center p-4">
        <svg viewBox="0 0 500 200" className="w-full h-full max-w-xl drop-shadow-md">
           {/* Acutángulo */}
          <polygon points="50,140 150,140 100,50" fill="#38bdf8" opacity="0.8" strokeLinejoin="round" />
          <line x1="100" y1="50" x2="100" y2="140" stroke="#0284c7" strokeWidth="3" strokeDasharray="5,5" />
          <text x="100" y="160" fill="#0284c7" fontSize="12" fontWeight="bold" textAnchor="middle">Acutángulo</text>
          
           {/* Rectángulo */}
          <polygon points="200,140 280,140 200,60" fill="#fbbf24" opacity="0.8" strokeLinejoin="round" />
          <polyline points="200,130 210,130 210,140" fill="none" stroke="#d97706" strokeWidth="2" />
          <text x="240" y="160" fill="#d97706" fontSize="12" fontWeight="bold" textAnchor="middle">Rectángulo</text>

           {/* Obtusángulo */}
          <polygon points="350,140 450,140 320,80" fill="#a3e635" opacity="0.8" strokeLinejoin="round" />
          <line x1="320" y1="80" x2="320" y2="140" stroke="#4d7c0f" strokeWidth="3" strokeDasharray="5,5" />
          <line x1="320" y1="140" x2="350" y2="140" stroke="#4d7c0f" strokeWidth="2" strokeDasharray="3,3" />
          <text x="400" y="160" fill="#4d7c0f" fontSize="12" fontWeight="bold" textAnchor="middle">Obtusángulo</text>
        </svg>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-slate-700 leading-relaxed mb-4">
            El área de un triángulo es siempre la mitad de un paralelogramo: <br/>
            <strong className="font-mono bg-blue-50 px-2 py-1 rounded text-blue-700 inline-block mt-2">A = (b × h) / 2</strong>
          </p>
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-sm text-slate-700 border border-slate-200">
            <p><strong>El secreto está en encontrar la altura (h):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Triángulo Acutángulo:</strong> La altura cae dentro de la figura (es <em>interior</em>).</li>
              <li><strong>Triángulo Rectángulo:</strong> ¡Es fácil! La altura es uno de los <em>lados</em> que forma el ángulo recto.</li>
              <li><strong>Triángulo Obtusángulo:</strong> ¡Atención! La altura cae fuera. Debes <em>prolongar la base</em> con una línea de puntos hasta que coincida con la vertical del vértice más alto.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className={cn("transition-colors", c1 ? "bg-emerald-50 border-emerald-200" : "")}>
          <CardContent className="p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              Ejercicio 1
              {c1 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </h4>

            <FormulaSelector 
              options={['A = b × h', 'A = (b × h) / 2', 'A = l × l', 'A = π × r²']}
              correctAnswer="A = (b × h) / 2"
              isUnlocked={f1Unlocked}
              onCorrect={() => setF1Unlocked(true)}
            />

            {f1Unlocked && (
              <>
                <p className="text-slate-600 mb-4">Calcula el área de un triángulo con <strong>base de 8 cm</strong> y una <strong>altura interior de 5 cm</strong>.</p>
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
                  Ejercicio 2 (Rectángulo)
                  {c2 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>

                <FormulaSelector 
                  options={['A = (b × h) / 2', 'A = b × h', 'A = c + c', 'A = (b + h) / 2']}
                  correctAnswer="A = (b × h) / 2"
                  isUnlocked={f2Unlocked}
                  onCorrect={() => setF2Unlocked(true)}
                />

                {f2Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Halla la superficie de un triángulo rectángulo cuyos lados perpendiculares miden <strong>4 cm</strong> y <strong>6 cm</strong>.</p>
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
                  Ejercicio 3 (Obtusángulo)
                  {c3 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>

                <FormulaSelector 
                  options={['A = (b × ext) / 3', 'A = b × h', 'A = (b × h) / 2', 'A = π × h²']}
                  correctAnswer="A = (b × h) / 2"
                  isUnlocked={f3Unlocked}
                  onCorrect={() => setF3Unlocked(true)}
                />
                
                {f3Unlocked && (
                  <>
                    <p className="text-slate-600 mb-4">Calcula el área de un triángulo cuya <strong>base es 5 cm</strong> y su <strong>altura exterior es de 6 cm</strong>.</p>
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
            <Card className={cn("transition-colors bg-gradient-to-br from-indigo-50 to-purple-50", c4 ? "bg-emerald-50 border-emerald-200 from-emerald-50 to-emerald-100" : "border-indigo-200")}>
              <CardContent className="p-6">
                <h4 className="font-bold text-indigo-800 mb-4 flex items-center justify-between">
                  Desafío Experto Inverso ⭐️
                  {c4 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </h4>
                <p className="text-slate-700 mb-4">
                  El área de un triángulo misterioso es de <strong>30 cm²</strong> y su altura interior es <strong>6 cm</strong>. 
                  Sabiendo que el área es la mitad de un paralelogramo, ¿cuánto debe medir la <strong>base</strong>?
                  <br/><span className="text-sm opacity-75">(Pista: A = (b × h) / 2. Así que 30 = (b × 6) / 2. Dobla el área primero)</span>
                </p>
                <div className="flex gap-2 items-center">
                  <Input value={ans4} onChange={e => setAns4(e.target.value)} type="number" className="w-32" placeholder="Ej: 10" />
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
