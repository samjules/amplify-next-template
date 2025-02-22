"use client";

import React, { useState } from "react";
import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import MainMenu from "../components/pilot-menu";
import Welcomebar from "../components/Welcomebar";
import FlightTimeForm from "../components/flighttimeform";
import AircraftCard from "../components/AircraftCard";
import AddAircraft from "../components/AddAircraft"; // ✅ Import AddAircraft

export default function Home() {
  const { signOut } = useAuthenticator();

  // ✅ State for toggling views
  const [showFlightTime, setShowFlightTime] = useState(false);
  const [showAircraft, setShowAircraft] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // ✅ Functions to toggle different views
  const toggleFlightTimeView = () => {
    setShowFlightTime((prevState) => !prevState);
    setShowAircraft(false);
    setShowSettings(false);
  };

  const toggleAircraftView = () => {
    setShowAircraft((prevState) => !prevState);
    setShowFlightTime(false);
    setShowSettings(false);
  };

  const toggleSettingsView = () => {
    setShowSettings((prevState) => !prevState);
    setShowAircraft(false);
    setShowFlightTime(false);
  };

  return (
    <div className="hero">
      {/* ✅ Navigation Bar */}
      <div>
        <MainMenu 
          onToggleFlightTime={toggleFlightTimeView} 
          onToggleAircraft={toggleAircraftView} 
          onToggleSettings={toggleSettingsView} 
        />
      </div>

      {/* ✅ Main Content */}
      <div>
        <Welcomebar />
        
        {/* ✅ Conditionally render components */}
        {showFlightTime && <FlightTimeForm />}
        {showAircraft && <AircraftCard />}
        {showSettings && <AddAircraft />}
        
        <button className="button" onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}