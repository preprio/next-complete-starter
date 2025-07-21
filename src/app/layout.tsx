import type {Metadata} from "next";
import NavBar from "@/components/navbar";
import './globals.css'
import {Ubuntu} from "next/font/google";
import Script from 'next/script'

// Helper function to get all the props for the PreprToolbar component (this needs a server component)
import { getToolbarProps, extractAccessToken } from '@preprio/prepr-nextjs/server'
 
// Import the PreprToolbar component & provider
import { PreprToolbar, PreprToolbarProvider} from '@preprio/prepr-nextjs/react'
 
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
 
    return (
      <html lang="en">
      <head>
        <Script
          id={'prepr_script'}
          dangerouslySetInnerHTML={{
            __html: `! function (e, t, p, r, n, a, s) {
      e[r] || ((n = e[r] = function () {
      n.process ? n.process.apply(n, arguments) : n.queue.push(arguments)
      }).queue = [], n.t = +new Date, (a = t.createElement(p)).async = 1, a.src = "https://cdn.tracking.prepr.io/js/prepr_v2.min.js?t=" + 864e5 * Math.ceil(new Date / 864e5), (s = t.getElementsByTagName(p)[0]).parentNode.insertBefore(a, s))
      }(window, document, "script", "prepr"), prepr("init", "ac_02b4a145e69be5488eb0e3abeada8ae5a2f88b0af09b33d442533b59e3bf4cd8"), prepr("event", "pageload");`,
          }}></Script>
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