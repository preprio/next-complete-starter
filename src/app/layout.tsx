import type {Metadata} from "next";
import NavBar from "@/components/navbar";
import './globals.css'
import {Ubuntu} from "next/font/google";
import { extractAccessToken } from '@preprio/prepr-nextjs/server'
import { PreprTrackingPixel } from '@preprio/prepr-nextjs/react'
import '@preprio/prepr-nextjs/index.css'

const ubuntu = Ubuntu({weight: ['400', '700'], subsets: ['latin']})

export const metadata: Metadata = {
  title: "Prepr Next.js complete starter",
  description: "Showing the power of personalization and A/B testing",
};

export default async function RootLayout({children,}: {children: React.ReactNode})
{
    const accessToken = extractAccessToken((process.env.PREPR_GRAPHQL_URL || 'https://graphql.prepr.io/ac_5e48636ec968b4fe9b7490b0fc4f7702e51873418ae2acbc58c6431d9fe27429')!)
    
  return (
      <html lang="en">
      <head>
        <PreprTrackingPixel accessToken={accessToken!}/>
      </head>
      <body className={ubuntu.className}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}