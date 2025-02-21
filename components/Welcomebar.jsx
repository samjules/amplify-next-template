import React from "react";

const WelcomeBar = () => {
  return (
    <div className="welcomebar">
      <div className="welcome_image">
        <img src="/Screenshot 2025-02-19 at 9.13.12 PM.png" alt="Welcome" />
      </div>

      <div className="welcome_text">
        <div>
          <h2>Hello user</h2>
        </div>

        <div>
          <p>
            “When once you have tasted flight, you will forever walk the earth
            with your eyes turned skyward, for there you have been, and there
            you will always long to return.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBar;