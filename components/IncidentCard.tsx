'use client';

import { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Share2, MapPin, Clock, FileText, ExternalLink } from 'lucide-react';
import { IncidentLog } from '@/lib/types';
import { formatDate, shareIncident } from '@/lib/utils';

interface IncidentCardProps {
  incident: IncidentLog;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareUrl = `${window.location.origin}/incident/${incident.logId}`;
      shareIncident(shareUrl);
    } catch (error) {
      console.error('Failed to share incident:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Card variant="elevated" className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Incident Report</h3>
          <p className="text-gray-300 text-sm">{incident.eventType}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">ID: {incident.logId.slice(-8)}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-300">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatDate(incident.timestamp)}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-300">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{incident.location}</span>
        </div>

        {incident.notes && (
          <div className="flex items-start space-x-2 text-gray-300">
            <FileText className="w-4 h-4 mt-0.5" />
            <span className="text-sm">{incident.notes}</span>
          </div>
        )}
      </div>

      {incident.recordingUrl && (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 border border-gray-700">
          <p className="text-white text-sm mb-2">Recording Available</p>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Recording
          </Button>
        </div>
      )}

      <div className="flex space-x-3 pt-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleShare}
          disabled={isSharing}
          className="flex-1"
        >
          <Share2 className="w-4 h-4 mr-2" />
          {isSharing ? 'Sharing...' : 'Share Report'}
        </Button>
      </div>
    </Card>
  );
}
