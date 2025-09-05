# LegalShield AI - Base Mini App

Know your rights, stay safe, instantly.

## Overview

LegalShield AI is a mobile-first Base Mini App that provides instant, state-specific legal rights information and scripting for interactions with law enforcement. The app includes incident recording capabilities and shareable incident reports.

## Features

### Core Features
- **On-Demand Rights Guides**: State-specific legal rights information
- **Situational Scripting**: Pre-written scripts for common police interaction scenarios
- **One-Tap Incident Recording**: Quick audio/video recording with secure storage
- **Automated Shareable Incident Cards**: Generate and share incident summaries

### Technical Features
- Next.js 15 with App Router
- OnchainKit integration for Base Mini App functionality
- Mobile-first responsive design
- TypeScript for type safety
- Tailwind CSS for styling
- Real-time recording capabilities

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd legalshield-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `OPENAI_API_KEY`: OpenAI API key for AI features
- Other API keys as needed

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   ├── providers.tsx      # MiniKit provider setup
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app shell
│   ├── Button.tsx         # Button component
│   ├── Card.tsx           # Card component
│   ├── LegalGuideView.tsx # Legal rights guide
│   ├── ScriptCard.tsx     # Script display
│   ├── RecordButton.tsx   # Recording functionality
│   └── IncidentCard.tsx   # Incident report display
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript type definitions
│   ├── constants.ts       # App constants and data
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Key Components

### AppShell
Main application shell with navigation and background elements.

### LegalGuideView
Displays state-specific legal rights information with interactive state selection.

### ScriptCard
Shows pre-written scripts for different police interaction scenarios.

### RecordButton
Handles audio/video recording with permission management and real-time feedback.

### IncidentCard
Displays incident reports with sharing capabilities.

## Data Models

### User
- userId, email, state, premiumStatus, createdAt

### IncidentLog
- logId, userId, timestamp, location, eventType, recordingUrl, sharedCardUrl, notes

### RightsGuide
- guideId, state, title, content, language

### Script
- scriptId, scenario, scriptText, language

## API Integration

The app is designed to integrate with:
- **OpenAI API**: For dynamic script generation
- **Airstack API**: For state-specific legal data
- **Pinata API**: For decentralized file storage
- **Turnkey API**: For blockchain functionality
- **Privy API**: For user authentication
- **Stripe API**: For payment processing

## Business Model

- **Free Tier**: Basic rights guides and scripts
- **Premium Tier** ($5/month or $10 one-time): Advanced features including:
  - Incident recording
  - Multi-language support
  - Automated shareable cards
  - Priority support

## Legal Disclaimer

This app provides educational information only and does not constitute legal advice. Laws vary by jurisdiction and situation. Users should consult with qualified attorneys for specific legal guidance.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support@legalshield-ai.com](mailto:support@legalshield-ai.com) or create an issue in the repository.
