import React from "react";
import "../app/app.css"; // Keeping your CSS import

const MxMenu = () => {
  return (
    <div className="sub-menu">

      <div>
        <button className="button-menu">
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Parts</div>
        </button>
      </div>

      <div>
        <button className="button-menu">
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Inspections</div>
        </button>
      </div>

      <div>
        <button className="button-menu">
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Fleet</div>
        </button>
      </div>

      <div>
        <button className="button-menu">
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Tracking sheets</div>
        </button>
      </div>

      <div>
        <button className="button-menu">
          <img className="person-icon" alt="" src="/person.svg" />
          <div className="pilots">Daily Event Logs</div>
        </button>
      </div>




    </div>
  );
};

export default MxMenu;