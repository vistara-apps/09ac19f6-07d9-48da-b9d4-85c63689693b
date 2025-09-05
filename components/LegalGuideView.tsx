'use client';

import { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Select } from './Select';
import { US_STATES } from '@/lib/constants';
import { StateInfo } from '@/lib/types';
import { Shield, AlertTriangle, Info } from 'lucide-react';

interface LegalGuideViewProps {
  variant?: 'static' | 'interactive';
}

export function LegalGuideView({ variant = 'interactive' }: LegalGuideViewProps) {
  const [selectedState, setSelectedState] = useState<string>('CA');
  const [selectedGuide, setSelectedGuide] = useState<string>('overview');

  const currentState = US_STATES.find(state => state.code === selectedState);

  const guideTypes = [
    { value: 'overview', label: 'Rights Overview' },
    { value: 'traffic', label: 'Traffic Stops' },
    { value: 'search', label: 'Search & Seizure' },
    { value: 'arrest', label: 'Arrest Procedures' },
    { value: 'recording', label: 'Recording Rights' }
  ];

  const getGuideContent = (type: string, state: StateInfo) => {
    const guides = {
      overview: {
        title: `Your Rights in ${state.name}`,
        content: `In ${state.name}, you have fundamental constitutional rights during any interaction with law enforcement. These include the right to remain silent, the right to refuse consent to searches, and the right to an attorney. Understanding these rights can help protect you during police encounters.`,
        highlights: state.rightsHighlights
      },
      traffic: {
        title: 'Traffic Stop Rights',
        content: `During a traffic stop in ${state.name}, you must provide your driver's license, registration, and proof of insurance when requested. However, you are not required to answer questions beyond identifying yourself. You have the right to remain silent and can politely decline to answer questions about where you're going or coming from.`,
        highlights: ['Provide required documents only', 'Right to remain silent', 'No consent to vehicle searches']
      },
      search: {
        title: 'Search & Seizure Laws',
        content: `The Fourth Amendment protects you from unreasonable searches and seizures. In ${state.name}, police generally need a warrant, your consent, or specific circumstances (like plain view or exigent circumstances) to search you or your property. You can clearly state "I do not consent to any searches."`,
        highlights: ['Warrant requirement', 'Right to refuse consent', 'Know exceptions to warrant rule']
      },
      arrest: {
        title: 'Arrest Procedures',
        content: `If you are being arrested in ${state.name}, do not resist even if you believe the arrest is unfair. Clearly state "I am invoking my right to remain silent and my right to an attorney." Do not answer questions or sign anything without a lawyer present.`,
        highlights: ['Do not resist arrest', 'Invoke right to silence', 'Request attorney immediately']
      },
      recording: {
        title: 'Recording Police Interactions',
        content: `In ${state.name}, you generally have the right to record police officers performing their duties in public spaces, as long as you don't interfere with their work. Keep a reasonable distance and clearly announce that you are recording if asked.`,
        highlights: ['Right to record in public', 'Maintain safe distance', 'Do not interfere with duties']
      }
    };

    return guides[type as keyof typeof guides] || guides.overview;
  };

  const currentGuide = getGuideContent(selectedGuide, currentState!);

  return (
    <div className="space-y-6">
      {variant === 'interactive' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Select Your State"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            options={US_STATES.map(state => ({ value: state.code, label: state.name }))}
          />
          <Select
            label="Guide Type"
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            options={guideTypes}
          />
        </div>
      )}

      <Card variant="elevated">
        <div className="flex items-start space-x-3 mb-4">
          <Shield className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">{currentGuide.title}</h2>
            <p className="text-gray-300 leading-relaxed">{currentGuide.content}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-400" />
            Key Points
          </h3>
          <ul className="space-y-2">
            {currentGuide.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-500 border-opacity-30">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-100 text-sm">
                <strong>Important:</strong> This information is for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction and situation. Consult with a qualified attorney for specific legal guidance.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
