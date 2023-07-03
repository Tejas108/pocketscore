import { useState } from 'react';
import { usePlayers } from '../context/PlayerContext';
import { useRouter } from 'next/router';
import PlayerCard from './PlayerCard';

function Match() {
  const { players, currentPlayerIndex, incrementInnings, endGame, inningsPerGame, setCurrentPlayerIndex } = usePlayers();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const currentPlayer = players[currentPlayerIndex];

  // Handle the end of a player's turn
  const handleEndTurn = () => {
    incrementInnings();
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  // Handle the game over event
  const handleGameOver = () => {
    setShowModal(true);
  };

  // Handle the selection of an option in the game over modal
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Handle the confirmation of the game over outcome
  const handleOutcomeConfirm = () => {
    if (selectedOption === 'Sunk the 8') {
      endGame('win');
    } else {
      endGame('lose');
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }

    setShowModal(false);
    setSelectedOption('');
  };

  // Handle the reset button click
  const handleReset = () => {
    // Clear player data and local storage
    localStorage.removeItem('playerData');

    window.location.reload();
  };

  return (
    <main className="game-screen">
      <div className="player-cards">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            player={player}
            gInnings={inningsPerGame}
            currentPlayer={index === currentPlayerIndex}
          />
        ))}
      </div>
      <div className="innings">
        <p>Game Innings</p>
        <div>
          <span>{inningsPerGame}</span>
        </div>
      </div>
      <div className="button-wrap">
        <button onClick={handleEndTurn}>End {currentPlayer.name}&apos;s Turn</button>
        <button className="game-over-btn" onClick={handleGameOver}>Game Over</button>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>
      {showModal && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="gameOverTitle">
          <div className="modal-content">
            <h2 id="gameOverTitle">Game Over</h2>
            <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
              <option value="">Select an Option</option>
              <option value="Sunk the 8">Sunk the 8</option>
              <option value="Scratched the 8">Scratched the 8</option>
              <option value="Made 8 early">Made the 8 Early</option>
            </select>
            <button onClick={handleOutcomeConfirm}>New Game</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Match;
