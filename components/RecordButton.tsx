'use client';

import { useState, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, Square } from 'lucide-react';
import { Button } from './Button';
import { generateIncidentId } from '@/lib/utils';

interface RecordButtonProps {
  variant?: 'active' | 'inactive';
  onRecordingComplete?: (recordingData: { id: string; url: string; duration: number }) => void;
}

export function RecordButton({ variant = 'inactive', onRecordingComplete }: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermissions, setHasPermissions] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      streamRef.current = stream;
      setHasPermissions(true);
      return true;
    } catch (error) {
      console.error('Permission denied:', error);
      alert('Camera and microphone permissions are required for recording.');
      return false;
    }
  };

  const startRecording = async () => {
    if (!hasPermissions) {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current);
    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const incidentId = generateIncidentId();
      
      onRecordingComplete?.({
        id: incidentId,
        url,
        duration: recordingTime
      });
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isRecording) {
    return (
      <div className="text-center space-y-4">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-mono text-xl">{formatTime(recordingTime)}</span>
          </div>
          <p className="text-white text-sm mb-4">Recording in progress...</p>
          <Button
            variant="destructive"
            onClick={stopRecording}
            className="w-full"
          >
            <Square className="w-5 h-5 mr-2" />
            Stop Recording
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={startRecording}
      className="w-full max-w-xs mx-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
    >
      <Video className="w-5 h-5 mr-2" />
      Record
    </Button>
  );
}
