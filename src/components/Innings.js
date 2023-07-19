import React, { useState } from 'react';

const Innings = ({ inningsPerGame, inningsPerMatch }) => {
  const [showInnings, setShowInnings] = useState(false);

  const handleShowHideInnings = () => {
    setShowInnings(!showInnings);
  };

  return (
    <section className="inning-wrap">
      <button
        id="show-hide-inning"
        type="button"
        aria-expanded={showInnings}
        aria-controls="content"
        aria-label={`${showInnings ? 'Hide' : 'Show'} Innings`}
        onClick={handleShowHideInnings}
      >
        {showInnings ? 'Hide' : 'Show'} Innings
      </button>
      {showInnings && (
        <div id="content" aria-labelledby="show-hide-inning">
          <div className="inning">
            <p>Game Innings</p>
            <div>
              <span>{inningsPerGame}</span>
            </div>
          </div>
          <div className="inning">
            <p>Match Innings</p>
            <div>
              <span>{inningsPerMatch}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Innings;
