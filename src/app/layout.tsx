import type {Metadata} from "next";
import NavBar from "@/components/NavBar";
import './globals.css'
import {Ubuntu} from "next/font/google";
import Script from 'next/script'
// Helper function to get all the props for the PreviewBar component (this needs a server component)
import {getPreviewBarProps} from '@preprio/prepr-nextjs'
// Import the PreviewBar component
import {PreprPreviewBar} from '@preprio/prepr-nextjs/components'
// Import the PreviewBar CSS
import '@preprio/prepr-nextjs/dist/components.css'

const ubuntu = Ubuntu({weight: ['400', '700'], subsets: ['latin']})

export const metadata: Metadata = {
    title: "Prepr advanced starter",
    description: "Showing the power of personalization and A/B testing",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    // Get the props for the PreviewBar component, pass the access token as an argument
    const previewBarProps = await getPreviewBarProps(process.env.PREPR_SEGMENTS_ACCESS_TOKEN!)

    return (
        <html lang="en">
        <head>
            <Script
                id={'prepr_script'}
                dangerouslySetInnerHTML={{
                    __html: `YOUR-PREPR-TRACKING-CODE`,
                }}></Script>
        </head>
        <body className={ubuntu.className}>
        {/* Render the PreviewBar component and spread the previewBarProps */}
        <PreprPreviewBar {...previewBarProps} />
        <NavBar/>
        {children}
        </body>
        </html>
    );
}