import React, {useState, useEffect} from 'react';

function PlayerCard({ player, currentPlayer }) {
  const [isWinner, setIsWinner] = useState(false);

  // Effect to handle displaying winner status and resetting it after 5 seconds
  useEffect(() => {
    if (player.gamesWon > 0) {
      setIsWinner(true);
      const timer = setTimeout(() => {
        setIsWinner(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [player.gamesWon]);

  return (
    <div className={`player-card ${isWinner ? 'winner' : ''} ${currentPlayer ? 'current-player' : ''}`}>
      <h3>{player.name}</h3>
      <p><span>Games:</span> <span>{player.gamesWon}</span></p>
      <p><span>Matches:</span> <span>{player.matchesWon}</span></p>
    </div>
  );
}

export default PlayerCard;
