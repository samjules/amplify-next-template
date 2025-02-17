"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

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

    client.models.Aircraft.create({
      Tail_Number: tailNumber,
      Model: model,
      Image: image,
    });
  }

  return (
    <div>
      <h1>Aircraft Fleet</h1>
      <button onClick={addAircraft}>+ Add Aircraft</button>
      <div className="aircraft-list">
        {aircraft.map((aircraftItem) => (
          <div key={aircraftItem.id} className="aircraft-card">
            <h3>{aircraftItem.Tail_Number}</h3>
            <p>Model: {aircraftItem.Model}</p>
            {aircraftItem.Image && <img src={aircraftItem.Image} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;