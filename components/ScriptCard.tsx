'use client';

import { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Copy, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { ScenarioScript } from '@/lib/types';

interface ScriptCardProps {
  script: ScenarioScript;
  variant?: 'default';
}

export function ScriptCard({ script, variant = 'default' }: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(script.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy script:', error);
    }
  };

  return (
    <Card variant="elevated" className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white">{script.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{script.scenario}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
        <p className="text-white font-medium leading-relaxed">"{script.script}"</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-white font-medium flex items-center">
          <AlertCircle className="w-4 h-4 mr-2 text-blue-400" />
          Important Tips
        </h4>
        <ul className="space-y-2">
          {script.tips.map((tip, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={copyScript}
          className="flex-1"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Script
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
