import React, { useState } from 'react';

const Sticky = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="stickynote">
      <button 
        className="sticky-close-button windows-control" 
        onClick={() => setIsVisible(false)}
        aria-label="Close sticky note"
      >
        <span>×</span> 
      </button>
      <p>Navigate by clicking through the files.</p><br /><br />
      <p>You can contact me at hafideledath AT gmail DOT com.</p><br /><br />
      <p>Oh, and hello, admissions officer. Hope you're having a nice day.</p>
    </div>
  );
};

export default Sticky;
