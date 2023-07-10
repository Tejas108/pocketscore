import Image from 'next/image';
import ball from '../../public/ ball.png';
import { usePlayers } from '../context/PlayerContext';
import { useRouter } from 'next/router';

function Header() {
  const { resetGame } = usePlayers();
  const router = useRouter();

  const handleReset = () => {
    resetGame();
    router.push('/Match');
  };

  return (

    <div className='title-wrap'>
      <h1><em>PocketScore Pro</em></h1>
    </div>

  );
}

export default Header;
