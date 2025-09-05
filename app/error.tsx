'use client';

import { Shield, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <Shield className="w-16 h-16 text-red-400 mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
          <p className="text-gray-300">
            We encountered an error while loading LegalShield AI. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
