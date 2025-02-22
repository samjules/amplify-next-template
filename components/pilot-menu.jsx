import React from "react";
import "../app/app.css";

// ✅ Accept both toggle functions as props
const MainMenu = ({ onToggleFlightTime, onToggleAircraft }) => {
  return (
    <div className="main-menu">
      <div>
        {/* ✅ Toggle Flight Time view */}
        <button className="button-menu" onClick={onToggleFlightTime}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Flight Time</div>
        </button>
      </div>

      <div>
        {/* ✅ Toggle Aircraft view */}
        <button className="button-menu" onClick={onToggleAircraft}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Aircraft</div>
        </button>
      </div>

      <div>
        <button className="button-menu">
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Weight and Balance</div>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;