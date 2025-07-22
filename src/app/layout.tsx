import type {Metadata} from "next";
import NavBar from "@/components/navbar";
import './globals.css'
import {Ubuntu} from "next/font/google";
import Script from 'next/script'

// Helper function to get all the props for the PreprToolbar component (this needs a server component)
import { getToolbarProps, extractAccessToken } from '@preprio/prepr-nextjs/server'
 
// Import the PreprToolbar component & provider
import { PreprToolbar, PreprToolbarProvider, PreprTrackingPixel} from '@preprio/prepr-nextjs/react'
 
// Import the CSS for the PreprToolbar
import '@preprio/prepr-nextjs/index.css'

const ubuntu = Ubuntu({weight: ['400', '700'], subsets: ['latin']})

export const metadata: Metadata = {
  title: "Prepr Next.js complete starter",
  description: "Showing the power of personalization and A/B testing",
};

export default async function RootLayout({children,}: {children: React.ReactNode})
{
    // Get the props for the PreprToolbar component and check that the environment variable is set to preview
    const isPreview = process.env.PREPR_ENV === 'preview'
    const toolbarProps = isPreview ? await getToolbarProps(process.env.PREPR_GRAPHQL_URL!) : null
    const accessToken = extractAccessToken(process.env.PREPR_GRAPHQL_URL!)
    
  return (
      <html lang="en">
      <head>
        <PreprTrackingPixel accessToken={accessToken!}/>
      </head>
      <body className={ubuntu.className}>
        {isPreview && toolbarProps ? (
          <PreprToolbarProvider props={toolbarProps}>
              <PreprToolbar />
              <NavBar/>
              {children}
          </PreprToolbarProvider>
          ) : (
              <>
                  <NavBar/>
                  {children}
              </>
          )}
      </body>
    </html>
  );
}