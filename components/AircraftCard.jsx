"use client"; // Required for Next.js client-side rendering

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "@aws-amplify/storage"; // Import S3 URL fetcher
import "../app/app.css"; // Keeping styles

const client = generateClient(); // AWS Amplify Data Client

const AircraftCard = () => {
  const [aircraftList, setAircraftList] = useState([]); // Store aircraft data
  const [imageUrls, setImageUrls] = useState({}); // Store fetched image URLs

  // Fetch aircraft data from the database
  const fetchAircraftData = async () => {
    try {
      const { data } = await client.models.Aircraft.list(); // Fetch all aircraft
      setAircraftList(data);

      // Fetch image URLs for each aircraft
      const urls = {};
      for (const aircraft of data) {
        if (aircraft.imageKey) {
          try {
            urls[aircraft.id] = await getUrl({ path: aircraft.imageKey });
          } catch (error) {
            console.error(`Error fetching image for ${aircraft.Tail_Number}:`, error);
          }
        }
      }
      setImageUrls(urls); // Update state with image URLs
    } catch (error) {
      console.error("Error fetching aircraft data:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchAircraftData();
  }, []);

  return (
    <div className="main-menu">
      <h2>Aircraft List</h2>

      <div className="row">
        {aircraftList.length > 0 ? (
          aircraftList.map((aircraft) => (
            <div key={aircraft.id} className="aircraft-card">
              <h2>{aircraft.Tail_Number}</h2>
              <img
                className="welcome_image"
                src={imageUrls[aircraft.id] || "/pexels-olly-762020.jpg"} 
                alt={`Aircraft ${aircraft.Tail_Number}`}
              />

              <h3>TSMOH: {aircraft.TSMOH ?? "N/A"}</h3>
              <h3>Time Remaining: {aircraft.TimeRemaining ?? "N/A"}</h3>
              <h3>Equipment List: [Coming Soon]</h3>

              <button className="button">Aircraft Flight Time</button>
              <button className="button">Aircraft Logbooks</button>
            </div>
          ))
        ) : (
          <p>No aircraft available.</p>
        )}
      </div>
    </div>
  );
};

export default AircraftCard;