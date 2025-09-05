import { StateInfo, ScenarioScript } from './types';

export const US_STATES: StateInfo[] = [
  { code: 'CA', name: 'California', rightsHighlights: ['Right to remain silent', 'Right to refuse searches', 'Right to record police'] },
  { code: 'NY', name: 'New York', rightsHighlights: ['Miranda rights', 'Stop and frisk limitations', 'Recording permissions'] },
  { code: 'TX', name: 'Texas', rightsHighlights: ['Constitutional rights', 'Vehicle search laws', 'Detention limits'] },
  { code: 'FL', name: 'Florida', rightsHighlights: ['Fifth Amendment rights', 'Search warrant requirements', 'Public recording rights'] },
  { code: 'IL', name: 'Illinois', rightsHighlights: ['Right to counsel', 'Consent to search', 'Traffic stop procedures'] },
];

export const SCENARIO_SCRIPTS: ScenarioScript[] = [
  {
    id: 'traffic-stop',
    title: 'Traffic Stop',
    scenario: 'You are pulled over by police during a traffic stop',
    script: 'Officer, I am exercising my right to remain silent. I do not consent to any searches. Am I free to go?',
    tips: [
      'Keep hands visible on steering wheel',
      'Provide license and registration when asked',
      'Do not admit fault or guilt',
      'Ask if you are free to go'
    ]
  },
  {
    id: 'street-encounter',
    title: 'Street Encounter',
    scenario: 'Police approach you on the street or in public',
    script: 'Officer, I am exercising my right to remain silent. I do not consent to any searches. Am I being detained or am I free to go?',
    tips: [
      'Stay calm and keep hands visible',
      'Do not run or resist',
      'Ask clearly if you are being detained',
      'If not detained, you can leave'
    ]
  },
  {
    id: 'home-visit',
    title: 'Home Visit',
    scenario: 'Police come to your home or residence',
    script: 'Officer, I am exercising my right to remain silent. I do not consent to entry or searches. Do you have a warrant?',
    tips: [
      'Do not open the door unless required',
      'Speak through the door if possible',
      'Ask to see a warrant',
      'Do not consent to entry without a warrant'
    ]
  },
  {
    id: 'arrest-situation',
    title: 'Arrest Situation',
    scenario: 'You are being arrested or detained',
    script: 'I am invoking my right to remain silent and my right to an attorney. I do not consent to any searches.',
    tips: [
      'Do not resist arrest',
      'Clearly invoke your rights',
      'Ask for a lawyer immediately',
      'Do not answer questions without counsel'
    ]
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];
