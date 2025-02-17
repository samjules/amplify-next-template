"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import AircraftCard from "../components/AircraftCard";
import { Tabs } from '@aws-amplify/ui-react';
import AddAircraft from "./addaircraft";


Amplify.configure(outputs);

const client = generateClient<Schema>();

const Fleet: React.FC = () => {
  const [aircraft, setAircraft] = useState<Array<Schema["Aircraft"]["type"]>>([]);

  function listAircraft() {
    client.models.Aircraft.observeQuery().subscribe({
      next: (data) => setAircraft([...data.items]),
    });
  }

  useEffect(() => {
    listAircraft();
  }, []);

  

  return (
    <div>

      
      <h1>Aircraft Fleet</h1>
      <div className="aircraft-list">
        {aircraft.map((aircraftItem) => (
          <AircraftCard
          key={aircraftItem.id}
          tailNumber={aircraftItem.Tail_Number ?? "Unknown"}
          model={aircraftItem.Model ?? "Unknown"}
          image={aircraftItem.Image ?? ""}
          timeRemaining={aircraftItem.TimeRemaining ?? 0}
          tsmoh={aircraftItem.TSMOH ?? 0}
        />
        ))}
      </div>
    </div>
  );
};

export default Fleet;