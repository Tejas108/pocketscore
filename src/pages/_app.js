import { PlayerProvider } from '../context/PlayerContext';
import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from "next/script";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import gtag from 'ga-gtag';

function App({ Component, pageProps }) {
  const router = useRouter();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;
  console.log(GA_MEASUREMENT_ID);

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url);
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };

  // }, [router.events]);
  return (
    <PlayerProvider>
      <>
        <header>
          <Header />
        </header>
        <Component {...pageProps} />
         {/* Global Site Tag (gtag.js) - Google Analytics */}
         {/* <Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script> */}
      </>
    </PlayerProvider>
  );
}

export default App;