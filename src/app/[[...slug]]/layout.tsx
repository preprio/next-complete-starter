import { Suspense } from 'react'

// Helper function to get all the props for the PreprToolbar component (this needs a server component)
import { getToolbarProps, PreprToolbar } from '@preprio/toolkit/nextjs'

export default async function Layout({ children }: { children: React.ReactNode }) {
    // Get the props for the PreprToolbar component and check that the environment variable is set to preview
    const isPreview = process.env.PREPR_ENV === 'preview'
    let toolbarProps = null
    
    // Wrap in try-catch to handle cases where headers() can't be called during static generation
    if (isPreview) {
      try {
        toolbarProps = await getToolbarProps((process.env.PREPR_GRAPHQL_URL || 'https://graphql.prepr.io/ac_5e48636ec968b4fe9b7490b0fc4f7702e51873418ae2acbc58c6431d9fe27429')!)
      } catch (error) {
        // During static generation (e.g., for not-found pages), headers() may not be available
        // Silently fail and render without the toolbar
        console.error('Failed to fetch toolbar props:', error)
        toolbarProps = null
      }
    }
    
    return (
        <>
            {isPreview && toolbarProps ? (
                <>
                    <Suspense fallback={null}>
                        <PreprToolbar {...toolbarProps} />
                    </Suspense>
                    {children}
                </>
            ) : (
                children
            )}
        </>
    )
}
