import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter Signup',
  description: 'Simple newsletter signup form with Brevo integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 