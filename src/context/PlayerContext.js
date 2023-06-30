import { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [isMatchOn, setIsMatchOn] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState(0);
  const [inningsPerGame, setInningsPerGame] = useState(0);
  const [inningsPerMatch, setInningsPerMatch] = useState(0);

  function addPlayer(name, skill) {
    setPlayers(players => [
      ...players,
      { name, skill, matchesWon: 0, gamesWon: 0, inningsPerGame: 0, inningsPerMatch: 0 },
    ]);
  }

  function startMatch() {
    if (players.length >= 2) {
      setIsMatchOn(true);
      setStartingPlayerIndex(0);
      setInningsPerGame(0);
      setInningsPerMatch(0);
    }
  }

  function incrementInnings() {
    if (currentPlayerIndex === startingPlayerIndex + 1) {
      setInningsPerGame(inningsPerGame => inningsPerGame + 1);
    }

    setInningsPerMatch(inningsPerMatch => inningsPerMatch + 1);
  }

  function endGame(outcome) {
    setPlayers(players => {
      const newPlayers = [...players];
      const currentPlayer = newPlayers[currentPlayerIndex];
      const otherPlayerIndex = (currentPlayerIndex + 1) % newPlayers.length;
      const otherPlayer = newPlayers[otherPlayerIndex];
      if (outcome === 'win') {
        currentPlayer.gamesWon += 1;
        if (
          (currentPlayer.skill > 2 && currentPlayer.gamesWon === currentPlayer.skill - 1) ||
          (currentPlayer.skill === 2 && currentPlayer.gamesWon === 2)
        ) {
          currentPlayer.matchesWon += 1;
          currentPlayer.gamesWon = 0;
        }
      } else if (outcome === 'lose') {
        otherPlayer.gamesWon += 1;
      }
      currentPlayer.inningsPerGame = 0;

      return newPlayers;
    });
  }
  
  

  const value = {
    players,
    addPlayer,
    startMatch,
    isMatchOn,
    currentPlayerIndex,
    incrementInnings,
    endGame,
    inningsPerGame,
    inningsPerMatch,
    setCurrentPlayerIndex,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayers() {
  return useContext(PlayerContext);
}
