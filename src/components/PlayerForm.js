import { useState, useRef, useEffect } from 'react';
import { usePlayers } from '../context/PlayerContext';
import { event } from "nextjs-google-analytics";

function PlayerForm() {
  const { addPlayer, handleClicks } = usePlayers();
  const [name, setName] = useState('');
  const [skill, setSkill] = useState(2);
  const [race, setRace] = useState();
  const [count, setCount] = useState(1);
  const nameInputRef = useRef(null);

  // Handle form submission
  const handleSubmit = (e) => {
    console.log('handle submit');
    e.preventDefault();

    addPlayer(name, skill, race);
    setName('');
    setSkill(2);
    setCount(count + 1);

    // Custom event tracking for GA4
    event('button_click', {
      category: 'index',
      label: 'Add Player',
    });

    nameInputRef.current.focus();
  };
  // Calculate games needed to win based on skill level
  const handleRace = () => {
    if (skill > 3) {
      setRace(skill - 1);
      console.log('click - skill > 3 - race: ', race);
    } else {
      setRace(2);
    }
  }

  useEffect(() => {
    // Give name field focus
    nameInputRef.current.focus();

    handleRace();
  }, [setRace, skill]);

  return (
    <div className="player-card-form">
      <h2>Add Players</h2>

      <div className='player-form'>
        <form onSubmit={handleSubmit}>
          <legend>Player {count}</legend>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" name="name" value={name} ref={nameInputRef} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label htmlFor="SL">
            Skill Level:
            <select id="SL" name="SL" value={skill} onChange={(e) => { setSkill(e.target.value) }} required>
              {[2, 3, 4, 5, 6, 7].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <button type="submit">Add Player</button>
        </form>
      </div>
    </div>

  );
}

export default PlayerForm;
