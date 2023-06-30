import React from 'react';

function PlayerCard({ player, currentPlayer }) {
  return (
    <div className={`player-card ${currentPlayer ? 'current-player' : ''}`}>
      <h3>{player.name}</h3>
      <p><span>Games:</span> <span>{player.gamesWon}</span></p>
      <p><span>Matches:</span> <span>{player.matchesWon}</span></p>
    </div>
  );
}

export default PlayerCard;
