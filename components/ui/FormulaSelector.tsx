import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FormulaSelectorProps {
  options: string[];
  correctAnswer: string;
  isUnlocked: boolean;
  onCorrect: () => void;
}

export function FormulaSelector({ options, correctAnswer, isUnlocked, onCorrect }: FormulaSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (isUnlocked) return;
    setSelected(option);
    if (option === correctAnswer) {
      onCorrect();
    }
  };

  return (
    <div className="mb-4 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
      <p className="font-bold text-slate-700 mb-3 uppercase tracking-wider text-xs">
        {isUnlocked ? "¡Fórmula correcta!" : "Adivina la fórmula para poder resolver:"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt || (isUnlocked && opt === correctAnswer);
          const isCorrect = isUnlocked && opt === correctAnswer;
          const isWrong = selected === opt && !isCorrect;
          
          return (
            <motion.button
              whileTap={!isUnlocked ? { scale: 0.98 } : {}}
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={isUnlocked}
              className={cn(
                "px-4 py-3 rounded-xl border-2 text-sm font-mono font-medium transition-all text-left flex justify-between items-center cursor-pointer disabled:cursor-auto",
                !isSelected && !isUnlocked && "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50",
                isCorrect && "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm",
                isWrong && "bg-red-50 border-red-400 text-red-800",
                isUnlocked && !isCorrect && "bg-slate-50 border-slate-100 text-slate-400 opacity-50"
              )}
            >
              <span>{opt}</span>
              {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {isWrong && <XCircle className="w-5 h-5 text-red-500" />}
            </motion.button>
          )
        })}
      </div>
    </div>
  );
}
