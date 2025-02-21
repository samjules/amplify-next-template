"use client";

import React, { useState } from "react";
import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import MainMenu from "../components/pilot-menu";
import Welcomebar from "../components/Welcomebar";
import FlightTimeForm from "../components/flighttimeform";

export default function Home() {
  const { signOut } = useAuthenticator();

  // ✅ State for toggling FlightTimeForm
  const [showFlightTime, setShowFlightTime] = useState(false);

  // ✅ Function to toggle FlightTimeForm visibility
  const toggleFlightTimeView = () => {
    setShowFlightTime((prevState) => !prevState);
  };

  return (
    <div className="hero">

       {/* Navigation Bar */}

      <div>
        {/* ✅ Pass the toggle function to MainMenu */}
        <MainMenu onToggleFlightTime={toggleFlightTimeView} />
      </div>


  {/* Main Content */}

      <div>
        <Welcomebar />
        {/* ✅ Conditionally render FlightTimeForm */}
        {showFlightTime && <FlightTimeForm />}
        <button className="button" onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}