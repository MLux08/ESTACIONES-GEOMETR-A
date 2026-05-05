import React from 'react';
import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'motion/react';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'success';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 hover:text-slate-900',
      primary: 'bg-blue-600 text-white shadow hover:bg-blue-700',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      ghost: 'hover:bg-slate-100 hover:text-slate-900 text-slate-600',
      success: 'bg-emerald-600 text-white shadow hover:bg-emerald-700'
    };

    const sizes = {
      default: 'h-11 px-6 py-2',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-14 px-8 rounded-2xl text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
