'use client';

import { ReactNode } from 'react';
import { Shield, Menu, User } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="floating-element top-20 left-10">
        <Shield size={24} />
      </div>
      <div className="floating-element top-40 right-20" style={{ animationDelay: '2s' }}>
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
      <div className="floating-element top-60 left-1/4" style={{ animationDelay: '4s' }}>
        <div className="w-2 h-2 bg-purple-400 rounded-full" />
      </div>
      <div className="floating-element bottom-40 right-10" style={{ animationDelay: '1s' }}>
        <div className="w-4 h-4 bg-pink-400 rounded-full" />
      </div>
      <div className="floating-element bottom-60 left-16" style={{ animationDelay: '3s' }}>
        <Shield size={16} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">LegalShield AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg glass-card hover:bg-opacity-20 transition-all duration-200">
              <Menu className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-lg glass-card hover:bg-opacity-20 transition-all duration-200">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
