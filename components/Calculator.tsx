import React, { useState } from 'react';
import { Calculator as CalculatorIcon, X, Delete } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function FloatingCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 0 : a / b;
      default: return b;
    }
  };

  const inputDigit = (digit: string) => {
    if (waitingForNewValue) {
      setDisplay(digit);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setPrevValue(newValue);
      
      // Formatear para evitar decimales muy largos
      setDisplay(String(parseFloat(newValue.toFixed(6))));
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const calculateResult = () => {
    if (!operator || prevValue === null) return;
    
    const inputValue = parseFloat(display);
    const newValue = calculate(prevValue, inputValue, operator);
    
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
    setDisplay(String(parseFloat(newValue.toFixed(6))));
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const deleteLast = () => {
    if (waitingForNewValue) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-72 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-900 p-4 pb-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <CalculatorIcon className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-sm">Calculadora</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 pt-0 -mt-2">
                <div className="bg-slate-100 rounded-2xl p-4 mb-4 text-right overflow-hidden shadow-inner border border-slate-200/60">
                  <div className="text-slate-400 text-xs h-4 mb-1 font-medium">
                    {prevValue !== null && operator ? `${prevValue} ${operator}` : ''}
                  </div>
                  <div className="text-3xl font-bold text-slate-800 tracking-tight truncate filter drop-shadow-sm">
                    {display}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button onClick={clearAll} className="col-span-2 py-3 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-xl transition-colors">AC</button>
                  <button onClick={deleteLast} className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl flex items-center justify-center transition-colors"><Delete className="w-5 h-5" /></button>
                  <button onClick={() => performOperation('÷')} className={cn("py-3 font-bold rounded-xl text-lg transition-colors", operator === '÷' && waitingForNewValue ? "bg-blue-600 text-white" : "bg-blue-100/70 hover:bg-blue-200 text-blue-600")}>÷</button>

                  <button onClick={() => inputDigit('7')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">7</button>
                  <button onClick={() => inputDigit('8')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">8</button>
                  <button onClick={() => inputDigit('9')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">9</button>
                  <button onClick={() => performOperation('×')} className={cn("py-3 font-bold rounded-xl text-lg transition-colors", operator === '×' && waitingForNewValue ? "bg-blue-600 text-white" : "bg-blue-100/70 hover:bg-blue-200 text-blue-600")}>×</button>

                  <button onClick={() => inputDigit('4')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">4</button>
                  <button onClick={() => inputDigit('5')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">5</button>
                  <button onClick={() => inputDigit('6')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">6</button>
                  <button onClick={() => performOperation('-')} className={cn("py-3 font-bold rounded-xl text-lg transition-colors", operator === '-' && waitingForNewValue ? "bg-blue-600 text-white" : "bg-blue-100/70 hover:bg-blue-200 text-blue-600")}>-</button>

                  <button onClick={() => inputDigit('1')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">1</button>
                  <button onClick={() => inputDigit('2')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">2</button>
                  <button onClick={() => inputDigit('3')} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">3</button>
                  <button onClick={() => performOperation('+')} className={cn("py-3 font-bold rounded-xl text-lg transition-colors", operator === '+' && waitingForNewValue ? "bg-blue-600 text-white" : "bg-blue-100/70 hover:bg-blue-200 text-blue-600")}>+</button>

                  <button onClick={() => inputDigit('0')} className="col-span-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">0</button>
                  <button onClick={inputDot} className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-lg transition-colors border border-slate-100 shadow-sm">.</button>
                  <button onClick={calculateResult} className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-md transition-colors">=</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-colors",
            isOpen ? "bg-slate-800 hover:bg-slate-700" : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <CalculatorIcon className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}
