"use client";

import React, { useState } from "react";
import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import MainMenu from "../components/pilot-menu";
import Welcomebar from "../components/Welcomebar";
import FlightTimeForm from "../components/flighttimeform";
import AircraftCard from "../components/AircraftCard"; // ✅ Import AircraftCard

export default function Home() {
  const { signOut } = useAuthenticator();

  // ✅ State for toggling FlightTimeForm and AircraftCard
  const [showFlightTime, setShowFlightTime] = useState(false);
  const [showAircraft, setShowAircraft] = useState(false);

  // ✅ Function to toggle FlightTimeForm visibility
  const toggleFlightTimeView = () => {
    setShowFlightTime((prevState) => !prevState);
    setShowAircraft(false); // Hide Aircraft when opening Flight Time
  };

  // ✅ Function to toggle AircraftCard visibility
  const toggleAircraftView = () => {
    setShowAircraft((prevState) => !prevState);
    setShowFlightTime(false); // Hide Flight Time when opening Aircraft
  };

  return (
    <div className="hero">
      {/* ✅ Navigation Bar */}
      <div>
        <MainMenu 
          onToggleFlightTime={toggleFlightTimeView} 
          onToggleAircraft={toggleAircraftView} 
        />
      </div>

      {/* ✅ Main Content */}
      <div>
        <Welcomebar />
        
        {/* ✅ Conditionally render FlightTimeForm or AircraftCard */}
        {showFlightTime && <FlightTimeForm />}
        {showAircraft && <AircraftCard />}
        
        <button className="button" onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}