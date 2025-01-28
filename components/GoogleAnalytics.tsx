'use client';

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

// 分离路由跟踪逻辑到单独的组件
function GoogleAnalyticsRouteTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = pathname + searchParams.toString()
        // 发送页面浏览事件到 GA
        window.gtag('config', 'G-HH9M5DQ3T9', {
            page_path: url,
        })
    }, [pathname, searchParams])

    return null
}

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=G-HH9M5DQ3T9`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-HH9M5DQ3T9');
                    `,
                }}
            />
            <Suspense fallback={null}>
                <GoogleAnalyticsRouteTracker />
            </Suspense>
        </>
    )
} 