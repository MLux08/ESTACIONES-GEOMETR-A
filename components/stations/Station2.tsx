import React, { useState } from 'react';
import { StationContainer } from './StationContainer';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Station2(props: any) {
  const [ansBote, setAnsBote] = useState('');
  const [ansPlato, setAnsPlato] = useState('');
  const [ansMoneda, setAnsMoneda] = useState('');
  const [ansExperto, setAnsExperto] = useState('');

  const cBote = ansBote.includes('3.1') || ansBote.includes('3,1');
  const cPlato = ansPlato.includes('3.1') || ansPlato.includes('3,1');
  const cMoneda = ansMoneda.includes('3.1') || ansMoneda.includes('3,1');
  
  const baseCompleted = cBote && cPlato && cMoneda;
  const cExperto = ansExperto === '31.4' || ansExperto === '31,4';

  const canComplete = baseCompleted && cExperto;

  return (
    <StationContainer
      id={2}
      title="El Misterioso Número π (pi)"
      objective="Descubrir de forma empírica la relación constante entre la circunferencia y su diámetro."
      canComplete={canComplete}
      {...props}
    >
      <div className="mb-6 rounded-2xl overflow-hidden relative h-48 sm:h-64 border border-slate-200 shadow-sm w-full bg-amber-50 flex items-center justify-center p-4">
        <svg viewBox="0 0 400 200" className="w-full h-full max-w-md drop-shadow-md">
           {/* Círculo con diámetro marcado */}
          <circle cx="200" cy="100" r="70" fill="none" stroke="#f59e0b" strokeWidth="8" />
          <circle cx="200" cy="100" r="66" fill="#fde68a" opacity="0.5" />
          <line x1="130" y1="100" x2="270" y2="100" stroke="#b45309" strokeWidth="3" strokeDasharray="6,4" />
          <circle cx="200" cy="100" r="4" fill="#b45309" />
          <text x="200" y="90" fill="#b45309" fontSize="16" fontWeight="bold" textAnchor="middle">Diámetro (D)</text>
          
          <path id="curve" d="M 130 100 A 70 70 0 0 1 270 100" fill="transparent" />
          <text fill="#d97706" fontSize="14" fontWeight="bold">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">Longitud (L)</textPath>
          </text>

          <text x="200" y="190" fill="#ea580c" fontSize="24" fontWeight="black" textAnchor="middle">L ÷ D = π (3.14...)</text>
        </svg>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-slate-800">Experimenta (Anota el resultado L/D en la tabla):</h3>
          <p className="text-slate-600">
            Mide con una cinta la &quot;línea del borde&quot; (Longitud L) y la distancia que cruza por el centro (Diámetro D) de los siguientes objetos.
            Luego divide Longitud entre Diámetro. (PISTA: El resultado siempre se acerca a 3,14)
          </p>
          
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left bg-white">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3 text-sm font-semibold text-slate-600">Objeto</th>
                  <th className="p-3 text-sm font-semibold text-slate-600">Resultado de L / D</th>
                  <th className="p-3 text-sm font-semibold text-slate-600 text-center">Correcto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-3 font-medium text-slate-700">Bote de conserva</td>
                  <td className="p-3">
                    <Input value={ansBote} onChange={e => setAnsBote(e.target.value)} placeholder="" className="h-9" />
                  </td>
                  <td className="p-3 text-center">
                    {cBote && <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />}
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 font-medium text-slate-700">Plato circular</td>
                  <td className="p-3">
                    <Input value={ansPlato} onChange={e => setAnsPlato(e.target.value)} placeholder="" className="h-9" />
                  </td>
                  <td className="p-3 text-center">
                    {cPlato && <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-700">Moneda grande</td>
                  <td className="p-3">
                    <Input value={ansMoneda} onChange={e => setAnsMoneda(e.target.value)} placeholder="" className="h-9" />
                  </td>
                  <td className="p-3 text-center">
                    {cMoneda && <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {baseCompleted && (
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 animate-in fade-in slide-in-from-bottom-4">
              <strong>Conclusión:</strong> ¿Te has fijado en que todos los resultados se acercan al número <strong>3,14</strong>? ¡Acabas de encontrar el número <strong>π (pi)</strong>!
            </div>
          )}
        </CardContent>
      </Card>
      
      {baseCompleted && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className={cn("transition-colors bg-gradient-to-br from-indigo-50 to-purple-50", cExperto ? "bg-emerald-50 border-emerald-200 from-emerald-50 to-emerald-100" : "border-indigo-200")}>
            <CardContent className="p-6">
              <h4 className="font-bold text-indigo-800 mb-4 flex items-center justify-between">
                Desafío Experto ⭐️
                {cExperto && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </h4>
              <p className="text-slate-700 mb-4">
                Sabiendo que <strong>Longitud = Diámetro × π</strong> (usa 3.14). 
                Si una noria gigante de atracciones tiene un diámetro de <strong>10 metros</strong>, ¿cuál es la longitud total del borde por donde giran las cabinas?
              </p>
              <div className="flex gap-2 items-center">
                <Input value={ansExperto} onChange={e => setAnsExperto(e.target.value)} type="number" className="w-32" placeholder="" />
                <span className="text-slate-500 font-medium">metros</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </StationContainer>
  );
}
