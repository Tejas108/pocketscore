import { useState, useRef, useEffect } from 'react';
import { usePlayers } from '../context/PlayerContext';

function PlayerForm() {
  const { addPlayer } = usePlayers();
  const [name, setName] = useState('');
  const [skill, setSkill] = useState(2);
  const [race, setRace] = useState(null);
  const nameInputRef = useRef(null);

  // Handle form submission
  const handleSubmit = (e) => {
    console.log('handle submit');
    e.preventDefault();
    addPlayer(name, skill, race);
    setName('');
    setSkill(2);
    // setRace(() => {
    //   if (skill > 2) {
    //     setRace
    //   }
    // });
    console.log('handleSubmit race: ', race);
    console.log('handleSubmit skill: ', skill);
    nameInputRef.current.focus();
  };
  // Give name field focus
  useEffect(() => {
    nameInputRef.current.focus();

  }, []);

  return (
    <div className="player-card-form">
      <h2>Add Players</h2>
      
      <div className='player-form'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" name="name" value={name} ref={nameInputRef} onChange={(e) => setName(e.target.value)} required/>
          </label>
          <label htmlFor="SL">
            Skill Level:
            <select id="SL" name="SL" value={skill} onChange={(e) => { setSkill(parseInt(e.target.value, 10)); }} required>
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
