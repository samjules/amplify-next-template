"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import AircraftCard from "../components/aircraftcard";

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

  function addAircraft() {
    const tailNumber = window.prompt("Enter Tail Number");
    const model = window.prompt("Enter Aircraft Model");
    const image = window.prompt("Enter Image URL");
    const timeRemaining = Number(window.prompt("Enter Time Remaining (hrs)"));
    const tsmoh = Number(window.prompt("Enter TSMOH (hrs)"));

    client.models.Aircraft.create({
      Tail_Number: tailNumber,
      Model: model,
      Image: image,
      TimeRemaining: timeRemaining,
      TSMOH: tsmoh,
    });
  }

  return (
    <div>
      <h1>Aircraft Fleet</h1>
      <button onClick={addAircraft}>+ Add Aircraft</button>
      <div className="aircraft-list">
        {aircraft.map((aircraftItem) => (
          <AircraftCard
            key={aircraftItem.id}
            tailNumber={aircraftItem.Tail_Number}
            model={aircraftItem.Model}
            image={aircraftItem.Image}
            timeRemaining={aircraftItem.TimeRemaining}
            tsmoh={aircraftItem.TSMOH}
          />
        ))}
      </div>
    </div>
  );
};

export default Fleet;