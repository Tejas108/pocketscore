import { PlayerProvider } from '../context/PlayerContext';
import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from "next/script";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoogleAnalytics } from "nextjs-google-analytics";

function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <PlayerProvider>
      <>
        <GoogleAnalytics trackPageViews />
        <header>
          <Header />
        </header>
        <Component {...pageProps} />
      </>
    </PlayerProvider>
  );
}

export default App;