import { PlayerProvider } from '../context/PlayerContext';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <header>
        <Header />
      </header>
      <Component {...pageProps} />
      {/* <Footer /> */}
    </PlayerProvider>
  );
}

export default App;