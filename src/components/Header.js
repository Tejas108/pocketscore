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
      <Image src={ball} alt="a blue billiards 8 ball on fire" fill={true} />
      <div className='title-wrap'>
        <h1>PocketScore Pro</h1>
      </div>
    </div>
  );
}

export default Header;
