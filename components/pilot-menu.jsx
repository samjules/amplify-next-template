import React from "react";
import "../app/app.css";

// ✅ Define props in the function parameters
const MainMenu = ({ onToggleFlightTime }) => {
  return (
    <div className="main-menu">
      <div>
        {/* ✅ Ensure button calls onToggleFlightTime */}
        <button className="button-menu" onClick={onToggleFlightTime}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Flight Time</div>
        </button>
      </div>

      <div>
        <button className="button-menu">
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Discrepancy</div>
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

// ✅ Ensure MainMenu accepts `onToggleFlightTime`
export default MainMenu;