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
    const accessToken = extractAccessToken(process.env.PREPR_GRAPHQL_URL!)
    
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