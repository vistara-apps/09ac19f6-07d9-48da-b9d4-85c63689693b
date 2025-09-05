'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Select } from '@/components/Select';
import { LegalGuideView } from '@/components/LegalGuideView';
import { ScriptCard } from '@/components/ScriptCard';
import { RecordButton } from '@/components/RecordButton';
import { IncidentCard } from '@/components/IncidentCard';
import { US_STATES, SCENARIO_SCRIPTS } from '@/lib/constants';
import { IncidentLog } from '@/lib/types';
import { generateIncidentId, getCurrentLocation } from '@/lib/utils';
import { Shield, BookOpen, MessageSquare, Video, BarChart3 } from 'lucide-react';

type TabType = 'home' | 'guides' | 'scripts' | 'record' | 'incidents';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedState, setSelectedState] = useState('CA');
  const [incidents, setIncidents] = useState<IncidentLog[]>([]);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleRecordingComplete = async (recordingData: { id: string; url: string; duration: number }) => {
    try {
      const location = await getCurrentLocation();
      const newIncident: IncidentLog = {
        logId: recordingData.id,
        userId: 'user_demo',
        timestamp: new Date(),
        location: `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`,
        eventType: 'Police Interaction',
        recordingUrl: recordingData.url,
        notes: `Recording duration: ${recordingData.duration} seconds`
      };
      
      setIncidents(prev => [newIncident, ...prev]);
      setActiveTab('incidents');
    } catch (error) {
      console.error('Failed to save incident:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                LegalShield AI
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Know your rights, stay safe, instantly.
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button
                  variant="secondary"
                  onClick={() => setActiveTab('guides')}
                  className="flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>State Rights Guide</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setActiveTab('scripts')}
                  className="flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Script Preview</span>
                </Button>
              </div>

              <div className="pt-4">
                <RecordButton onRecordingComplete={handleRecordingComplete} />
              </div>
            </div>

            {/* State Selection */}
            <Card variant="elevated">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-purple-400" />
                  Your State
                </h2>
                <Select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  options={US_STATES.map(state => ({ value: state.code, label: state.name }))}
                />
                <p className="text-gray-300 text-sm">
                  Legal rights and procedures vary by state. Select your state for personalized guidance.
                </p>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <div className="space-y-2">
                  <BarChart3 className="w-8 h-8 text-purple-400 mx-auto" />
                  <div className="text-2xl font-bold text-white">50</div>
                  <div className="text-sm text-gray-300">States Covered</div>
                </div>
              </Card>
              <Card className="text-center">
                <div className="space-y-2">
                  <MessageSquare className="w-8 h-8 text-pink-400 mx-auto" />
                  <div className="text-2xl font-bold text-white">{SCENARIO_SCRIPTS.length}</div>
                  <div className="text-sm text-gray-300">Scenario Scripts</div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'guides':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Legal Rights Guide</h2>
              <p className="text-gray-300">State-specific information about your rights</p>
            </div>
            <LegalGuideView />
          </div>
        );

      case 'scripts':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Situation Scripts</h2>
              <p className="text-gray-300">Pre-written scripts for common scenarios</p>
            </div>
            <div className="space-y-4">
              {SCENARIO_SCRIPTS.map((script) => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>
          </div>
        );

      case 'record':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Record Incident</h2>
              <p className="text-gray-300">Document your interaction for safety and evidence</p>
            </div>
            <Card variant="elevated" className="text-center space-y-6">
              <Video className="w-16 h-16 text-purple-400 mx-auto" />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Ready to Record</h3>
                <p className="text-gray-300">
                  Tap the record button to start documenting your interaction. 
                  The recording will be securely stored and can be shared if needed.
                </p>
                <RecordButton onRecordingComplete={handleRecordingComplete} />
              </div>
            </Card>
          </div>
        );

      case 'incidents':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Incident Reports</h2>
              <p className="text-gray-300">Your documented interactions and recordings</p>
            </div>
            {incidents.length === 0 ? (
              <Card className="text-center space-y-4">
                <Shield className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">No Incidents Recorded</h3>
                  <p className="text-gray-300 mb-4">
                    Your incident reports will appear here after recording interactions.
                  </p>
                  <Button variant="primary" onClick={() => setActiveTab('record')}>
                    Start Recording
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <IncidentCard key={incident.logId} incident={incident} />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {renderTabContent()}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg border-t border-white border-opacity-20">
          <div className="max-w-xl mx-auto px-4 py-2">
            <div className="flex justify-around">
              {[
                { id: 'home', icon: Shield, label: 'Home' },
                { id: 'guides', icon: BookOpen, label: 'Guides' },
                { id: 'scripts', icon: MessageSquare, label: 'Scripts' },
                { id: 'record', icon: Video, label: 'Record' },
                { id: 'incidents', icon: BarChart3, label: 'Reports' },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as TabType)}
                  className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeTab === id
                      ? 'text-purple-400 bg-purple-400 bg-opacity-20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom padding to account for fixed navigation */}
        <div className="h-20"></div>
      </div>
    </AppShell>
  );
}
