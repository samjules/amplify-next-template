import React from "react";
import "../app/app.css";

const MainMenu = ({ 
  onToggleFlightTime, 
  onToggleAircraft, 
  onToggleSettings,
  onToggleUserProfile  // Add this to the destructured props
}) => {
  return (
    <div className="main-menu">
      <div>
        <button className="button-menu" onClick={onToggleFlightTime}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Flight Time</div>
        </button>
      </div>

      <div>
        <button className="button-menu" onClick={onToggleAircraft}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Aircraft</div>
        </button>
      </div>

      <div>
        <button className="button-menu" onClick={onToggleSettings}>
          <img className="person-icon" alt="" src="/settings.svg" />
          <div className="pilots">Settings</div>
        </button>
      </div>

      {/* Add UserProfile toggle button */}
      <div>
        <button className="button-menu" onClick={onToggleUserProfile}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">User Profile</div>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;