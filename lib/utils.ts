export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function generateIncidentId(): string {
  return `incident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function shareIncident(incidentUrl: string): void {
  if (navigator.share) {
    navigator.share({
      title: 'LegalShield AI - Incident Report',
      text: 'View my incident report',
      url: incidentUrl,
    });
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(incidentUrl);
  }
}
