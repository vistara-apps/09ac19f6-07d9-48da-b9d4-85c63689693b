'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  className?: string;
  onClick?: () => void;
}

export function Card({ children, variant = 'default', className = '', onClick }: CardProps) {
  const baseClasses = 'glass-card p-6 transition-all duration-200';
  
  const variants = {
    default: 'hover:bg-opacity-15',
    elevated: 'shadow-lg hover:shadow-xl hover:bg-opacity-20'
  };

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
