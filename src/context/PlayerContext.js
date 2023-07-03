import { createContext, useState, useContext, useEffect } from 'react';

// Create the player context
const PlayerContext = createContext();

// Player provider component
export function PlayerProvider({ children }) {
  // State variables
  const [players, setPlayers] = useState([]); // Store the players' data
  const [isMatchOn, setIsMatchOn] = useState(false); // Determine if a match is ongoing
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Index of the current player
  const [startingPlayerIndex, setStartingPlayerIndex] = useState(0); // Index of the starting player
  const [inningsPerGame, setInningsPerGame] = useState(0); // Number of innings per game
  const [inningsPerMatch, setInningsPerMatch] = useState(0); // Number of innings per match
  const [isMatchOver, setIsMatchOver] = useState(false); // New state variable


  // Load players' data from local storage on component mount
  useEffect(() => {
    const storedPlayers = localStorage.getItem('playerData');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  // Save players' data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('playerData', JSON.stringify(players));
  }, [players]);

  // Add a new player to the players' list
  function addPlayer(name, skill) {
    const newPlayer = {
      name,
      skill,
      matchesWon: 0,
      gamesWon: 0,
      inningsPerGame: 0,
      inningsPerMatch: 0,
    };
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  }

  // Start the match if there are at least two players
  function startMatch() {
    if (players.length >= 2) {
      setIsMatchOn(true);
      setStartingPlayerIndex(0);
      setInningsPerGame(0);
      setInningsPerMatch(0);
      setIsMatchOver(false); // Reset match over status
    }
  }

  // Increment the innings count, both per game and per match
  function incrementInnings() {
    if (currentPlayerIndex === startingPlayerIndex + 1) {
      setInningsPerGame((prevInnings) => prevInnings + 1);
    }
    setInningsPerMatch((prevInnings) => prevInnings + 1);
  }

  // End the game and update players' data based on the outcome
  const endGame = (outcome) => {
    console.log('innings:', inningsPerGame);
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      const currentPlayer = newPlayers[currentPlayerIndex];
      const otherPlayer = newPlayers[(currentPlayerIndex + 1) % newPlayers.length];

      if (outcome === 'win') {
        currentPlayer.gamesWon += 1;
        if (
          (currentPlayer.skill > 2 && currentPlayer.gamesWon === currentPlayer.skill - 1) ||
          (currentPlayer.skill === 2 && currentPlayer.gamesWon === 2)
        ) {
          currentPlayer.matchesWon += 1;
          currentPlayer.gamesWon = 0;
          otherPlayer.gamesWon = 0;
          setIsMatchOver(true); // Set match over status
        }
      } else {
        otherPlayer.gamesWon += 1;
        if (
          (otherPlayer.skill > 2 && otherPlayer.gamesWon === otherPlayer.skill - 1) ||
          (otherPlayer.skill === 2 && otherPlayer.gamesWon === 2)
        ) {
          otherPlayer.matchesWon += 1;
          currentPlayer.gamesWon = 0;
          otherPlayer.gamesWon = 0;
          setIsMatchOver(true); // Set match over status
        }
      }

      currentPlayer.inningsPerGame = 0;

      return newPlayers;
    });
  };

  // Create the value object to be provided to consuming components
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

  // Provide the value to consuming components
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

// Custom hook to access player context
export function usePlayers() {
  return useContext(PlayerContext);
}
