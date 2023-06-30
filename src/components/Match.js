import React, { useState, useEffect } from 'react';
import { usePlayers } from '../context/PlayerContext';
import { useRouter } from 'next/router';
import PlayerCard from './PlayerCard';

function Match() {
  const { players, currentPlayerIndex, incrementInnings, endGame, inningsPerGame, inningsPerMatch, setCurrentPlayerIndex } = usePlayers();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [winnerName, setWinnerName] = useState('');
  const [showWinnerText, setShowWinnerText] = useState(false);

  useEffect(() => {
    if (showWinnerText) {
      const timer = setTimeout(() => {
        setShowWinnerText(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showWinnerText]);

  const handleEndTurn = () => {
    incrementInnings();
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  const handleGameOver = () => {
    setShowModal(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    setShowModal(false);
    setSelectedOption('');
    setShowWinnerText(false);
    router.push('/match');
  };

  const handleOutcomeConfirm = () => {
    if (selectedOption === 'Sunk the 8') {
      endGame('win');
      setShowWinnerText(true);
    } else {
      endGame('lose');
      setShowWinnerText(false);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }

    setShowModal(false);
    setSelectedOption('');
  };

  if (showWinnerText) {
    setTimeout(() => {
      setShowWinnerText(false);
    }, 5000);
  }

  return (
    <main className='game-screen'>
      <div className="player-cards">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            player={player}
            gInnings={inningsPerGame}
            mInnings={inningsPerMatch}
            currentPlayer={index === currentPlayerIndex}
          />
        ))}
      </div>
      <div className='innings'>
        <p>Game Innings</p>
        <div>
          <span>{inningsPerGame}</span>
          {/* &nbsp;<span>M:{inningsPerMatch}</span> */}
        </div>
      </div>
      <div className='button-wrap'>
        <button onClick={handleEndTurn}>End {players[currentPlayerIndex].name}'s Turn</button>
        <button className='game-over-btn' onClick={handleGameOver}>Game Over</button>
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

      {showWinnerText && (
        <div className="winner-text" role="alert">
          <p>{winnerName} - Winner!</p>
        </div>
      )}
    </main>
  );
}

export default Match;
