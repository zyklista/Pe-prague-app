import React, { useState } from 'react';

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => setShowSettings((s) => !s);
  const closeSettings = () => setShowSettings(false);

  return (
    <header className="header header-blue-gradient">
      <div className="header-row">
        <div className="header-flag">
          <img src="/ph-flag.png" alt="PH Flag" className="flag-img" />
        </div>
        <div className="header-welcome white-text">
          Welcome, <span className="user-name">Juma</span>
        </div>
        <div className="header-icons">
          <span className="header-bell">
            <i className="far fa-bell"></i>
          </span>
          <span className="header-settings" tabIndex={0} onClick={handleSettingsClick} onBlur={closeSettings}>
            <i className="fas fa-cog"></i>
            {showSettings && (
              <div className="settings-dropdown" onMouseDown={e => e.preventDefault()}>
                <button className="settings-logout-btn">Log out</button>
              </div>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;