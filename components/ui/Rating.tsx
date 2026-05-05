import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface RatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function RatingSelector({ value, onChange, disabled }: RatingSelectorProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      {[1, 2, 3].map((star) => (
        <motion.button
          key={star}
          whileHover={disabled ? {} : { scale: 1.1 }}
          whileTap={disabled ? {} : { scale: 0.9 }}
          disabled={disabled}
          onClick={() => onChange(star)}
          className={cn(
            "p-2 rounded-full transition-colors",
            disabled ? "cursor-not-allowed" : "hover:bg-amber-50 cursor-pointer"
          )}
        >
          <Star 
            className={cn(
              "w-8 h-8 transition-all", 
              value >= star ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "text-slate-300 fill-transparent"
            )} 
          />
        </motion.button>
      ))}
    </div>
  );
}
