import React, { useState, useEffect } from 'react';

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
      <div className="score-wrap">
        <div><span>Games</span> <span>{player.gamesWon}</span></div>
        <div><span>Matches</span> <span>{player.matchesWon}</span></div>
      </div>
    </div>
  );
}

export default PlayerCard;
