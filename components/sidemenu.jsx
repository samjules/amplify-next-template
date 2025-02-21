import React, { useState } from "react";
import PilotMenu from "../components/pilot-menu"
import MxMenu from "../components/mxmenu"

const MainMenu = () => {
  // State to track the current view
  const [currentView, setCurrentView] = useState("pilots");

  return (
    <div className="main-menu">
      {/* Pilots Button */}
      <div>
        <button className="button-menu" onClick={() => setCurrentView("pilots")}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Pilots</div>
        </button>
      </div>

      {/* Maintenance Button */}
      <div>
        <button className="button-menu" onClick={() => setCurrentView("maintenance")}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Maintenance</div>
        </button>
      </div>

      {/* Owner/Operator Button */}
      <div>
        <button className="button-menu" onClick={() => setCurrentView("owner")}>
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Owner/Operator</div>
        </button>
      </div>

      {/* Settings Button */}
      <div>
        <button className="button-menu" onClick={() => setCurrentView("settings")}>
          <img className="person-icon" alt="" src="/settings.svg" />
          <div className="pilots">Settings</div>
        </button>
      </div>

      {/* Content Section (Changes Based on Selected Button) */}
      <div className="content">
        {currentView === "pilots" && <PilotMenu />}
        {currentView === "maintenance" && <MxMenu />}
        {currentView === "owner" && <h2>🏢 Owner/Operator Section</h2>}
        {currentView === "settings" && <h2>⚙️ Settings Section</h2>}
      </div>
    </div>
  );
};

export default MainMenu;