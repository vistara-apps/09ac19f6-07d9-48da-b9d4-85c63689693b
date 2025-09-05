'use client';

import { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            'w-full glass-card px-4 py-3 text-white bg-transparent border-0 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-opacity-20',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
      </div>
    </div>
  );
}
