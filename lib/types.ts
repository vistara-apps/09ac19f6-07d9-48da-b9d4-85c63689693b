export interface User {
  userId: string;
  email: string;
  state: string;
  premiumStatus: boolean;
  createdAt: Date;
}

export interface IncidentLog {
  logId: string;
  userId: string;
  timestamp: Date;
  location: string;
  eventType: string;
  recordingUrl?: string;
  sharedCardUrl?: string;
  notes?: string;
}

export interface RightsGuide {
  guideId: string;
  state: string;
  title: string;
  content: string;
  language: string;
}

export interface Script {
  scriptId: string;
  scenario: string;
  scriptText: string;
  language: string;
}

export interface StateInfo {
  code: string;
  name: string;
  rightsHighlights: string[];
}

export interface ScenarioScript {
  id: string;
  title: string;
  scenario: string;
  script: string;
  tips: string[];
}
