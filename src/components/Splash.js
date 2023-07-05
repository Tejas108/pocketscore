import React from 'react';

function Splash({ handleGetStarted }) {
  return (
    <div className="splash-screen">
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
}

export default Splash;