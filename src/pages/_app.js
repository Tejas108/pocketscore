import { PlayerProvider } from '../context/PlayerContext';
import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from "next/script";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from "../lib/gtag";

function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <PlayerProvider>
      <>
        <header>
          <Header />
        </header>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4EYYTV3CTY"></Script>
        <Script
          strategy="afterInteractive"
          src={'https://www.googletagmanager.com/gtag/js?id=G-4EYYTV3CTY'}
        />
        <Script
          id="gascript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4EYYTV3CTY', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
          <Component {...pageProps} />
      </>
    </PlayerProvider>
  );
}

export default App;