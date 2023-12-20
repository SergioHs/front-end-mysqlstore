"use client" 
import { ThemeProvider } from '@/app/contexts/ThemeContext'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children  }) {
  
  return (
    <AuthProvider>
    <ThemeProvider>
      <html lang="en">
          <link rel="manifest" href="manifest.json"></link>
          <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
    </AuthProvider>
  )
}
