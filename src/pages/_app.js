import { PlayerProvider } from '../context/PlayerContext';
import '../styles/globals.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <header>
        <Header />
      </header>
      <Component {...pageProps} />
    </PlayerProvider>
  );
}

export default MyApp;