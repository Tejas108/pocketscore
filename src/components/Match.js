import { useState, useRef, useEffect } from 'react';
import { usePlayers } from '../context/PlayerContext';
import PlayerCard from './PlayerCard';
import Innings from './Innings';

function Match() {
  const { players, currentPlayerIndex, incrementInnings, endGame, inningsPerGame, inningsPerMatch, setCurrentPlayerIndex } = usePlayers();
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
      <h2 style={{ color: '#e0e0e0' }}>
        <span>Race </span>
        {/* <span>Race is {player[0].race} - {player[1].race}</span> */}
        {players.map((player, index) => (
          <span key={index}>{player.race} <span className='race-to'> to </span></span>
        ))}
      </h2>
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
      <Innings inningsPerGame={inningsPerGame} inningsPerMatch={inningsPerMatch} />

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
              <option value="">How Did It End?</option>
              <option value="Sunk the 8">Sunk the 8</option>
              <option value="Scratched the 8">Scratched the 8</option>
              <option value="Made 8 early">Made the 8 Early</option>
              <option value="Made 8 in wrong pocket">Made 8 in wrong pocket</option>
            </select>
            <button onClick={handleOutcomeConfirm}>New Game</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Match;
