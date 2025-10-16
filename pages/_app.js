import '../styles/globals.css';
import { useEffect } from 'react';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){dataLayer.push(arguments);}
      window.gtag('js', new Date());
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, { page_path: window.location.pathname });
    }
  }, []);

  return (
    <>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      )}
      {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{__html:`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}} />
      )}
      <Component {...pageProps} />
    </>
  );
}
