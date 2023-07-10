import { usePlayers } from '../context/PlayerContext';
import PlayerForm from '../components/PlayerForm';
import Match from '../components/Match';

export default function Home() {
  const { players, isMatchOn, startMatch } = usePlayers();
  // Handle the reset button click
  const handleReset = () => {
    // Clear player data and local storage
    localStorage.removeItem('playerData');

    window.location.reload();
  };
  if (isMatchOn) {
    return <Match />;
  }
  return (
    <main className='players-start'>
      {players.length < 2 &&
        <PlayerForm />
      }
      {players.length === 2 &&
        <h2>Players</h2>
      }
      {players.map((player, index) => (
        <div key={index} className='player-card-wrap'>
          <div className='player-card' role="alert">
            <h3>{player.name}</h3>
            <p>SL: {player.skill}</p>
          </div>
          <div className="divider"><span>vs</span></div>
        </div>
      ))}
      {players.length >= 2 && (
        <div className="button-wrap">
          <button className='cancel-btn' onClick={handleReset}>Reset</button>
          <button className='start-btn' onClick={startMatch}>Go!</button>
        </div>
      )}
    </main>
  );
}
