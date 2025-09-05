import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LegalShield AI - Know Your Rights',
  description: 'Know your rights, stay safe, instantly. State-specific legal rights information and scripting for law enforcement interactions.',
  keywords: 'legal rights, law enforcement, police interaction, legal advice, civil rights',
  authors: [{ name: 'LegalShield AI Team' }],
  openGraph: {
    title: 'LegalShield AI - Know Your Rights',
    description: 'Know your rights, stay safe, instantly.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
