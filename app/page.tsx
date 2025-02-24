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
import Profile from "../components/UserInfo";

export default function Home() {
  const { signOut } = useAuthenticator();

  // ✅ State for toggling views
  const [showFlightTime, setShowFlightTime] = useState(false);
  const [showAircraft, setShowAircraft] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false); // ✅ New state for user profile toggle

  // ✅ Functions to toggle different views
  const toggleFlightTimeView = () => {
    setShowFlightTime((prevState) => !prevState);
    setShowAircraft(false);
    setShowSettings(false);
    setShowUserProfile(false); // Hide user profile when switching
  };

  const toggleAircraftView = () => {
    setShowAircraft((prevState) => !prevState);
    setShowFlightTime(false);
    setShowSettings(false);
    setShowUserProfile(false); // Hide user profile when switching
  };

  const toggleSettingsView = () => {
    setShowSettings((prevState) => !prevState);
    setShowAircraft(false);
    setShowFlightTime(false);
    setShowUserProfile(false); // Hide user profile when switching
  };

  const toggleUserProfileView = () => {
    setShowUserProfile((prevState) => !prevState);
    setShowAircraft(false);
    setShowFlightTime(false);
    setShowSettings(false); // Hide settings and aircraft when switching
  };

  return (
    <div className="hero">
      {/* ✅ Navigation Bar */}
      <div className="Side-Menu">
        <MainMenu
          onToggleFlightTime={toggleFlightTimeView}
          onToggleAircraft={toggleAircraftView}
          onToggleSettings={toggleSettingsView}
          onToggleUserProfile={toggleUserProfileView} // ✅ Add handler to toggle user profile
        />
        <button className="button" onClick={signOut}>Sign out</button>
      </div>

      {/* ✅ Main Content */}
      <div>
        <Welcomebar />

        {/* ✅ Conditionally render components */}
        {showFlightTime && <FlightTimeForm />}
        {showAircraft && <AircraftCard />}
        {showSettings && <AddAircraft />}
        {showUserProfile && <Profile />}
      </div>
    </div>
  );
}
