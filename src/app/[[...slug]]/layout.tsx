import { Suspense } from 'react'

// Helper function to get all the props for the PreprToolbar component (this needs a server component)
import { getToolbarProps, extractAccessToken } from '@preprio/prepr-nextjs/server'

// Import the PreprToolbar component & provider
import { PreprToolbar, PreprToolbarProvider } from '@preprio/prepr-nextjs/react'

export default async function Layout({ children }: { children: React.ReactNode }) {
    // Get the props for the PreprToolbar component and check that the environment variable is set to preview
    const isPreview = process.env.PREPR_ENV === 'preview'
    let toolbarProps = null
    
    // Wrap in try-catch to handle cases where headers() can't be called during static generation
    if (isPreview) {
      try {
        toolbarProps = await getToolbarProps(process.env.PREPR_GRAPHQL_URL!)
      } catch (error) {
        // During static generation (e.g., for not-found pages), headers() may not be available
        // Silently fail and render without the toolbar
        console.error('Failed to fetch toolbar props:', error)
        toolbarProps = null
      }
    }
    
    const accessToken = extractAccessToken(process.env.PREPR_GRAPHQL_URL!)
    
    return (
        <>
            {isPreview && toolbarProps ? (
                <PreprToolbarProvider props={toolbarProps}>
                    <Suspense fallback={null}>
                        <PreprToolbar />
                    </Suspense>
                    {children}
                </PreprToolbarProvider>
            ) : (
                children
            )}
        </>
    )
}