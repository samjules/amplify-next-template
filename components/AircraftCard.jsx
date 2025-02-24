"use client"; // Required for Next.js client-side rendering

import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "@aws-amplify/storage"; // Import S3 URL fetcher
import Link from "next/link"; // Import Next.js Link for navigation
import "../app/app.css"; // Import styles

const client = generateClient(); // AWS Amplify Data Client

const AircraftCard = () => {
  const [aircraftList, setAircraftList] = useState([]); // Store aircraft data
  const [imageUrls, setImageUrls] = useState({}); // Store fetched image URLs

  // Fetch aircraft data from the database
  const fetchAircraftData = async () => {
    try {
      const { data } = await client.models.Aircraft.list(); // Fetch all aircraft
      setAircraftList(data);
      fetchAircraftImages(data);
    } catch (error) {
      console.error("Error fetching aircraft data:", error);
    }
  };

  // Fetch images dynamically from S3
  const fetchAircraftImages = useCallback(async (aircraftData) => {
    const urls = {};

    await Promise.all(
      aircraftData.map(async (aircraft) => {
        if (aircraft.imageKey) {
          try {
            // Fetch the S3 URL using the correct key
            const { url } = await getUrl({ path: aircraft.imageKey });
            urls[aircraft.id] = url;
          } catch (error) {
            console.error(`Error fetching image for ${aircraft.Tail_Number}:`, error);
          }
        }
      })
    );

    setImageUrls(urls); // Update state with URLs
  }, []);

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

              {/* Display the image or a placeholder */}
              <img
                className="welcome_image"
                src={imageUrls[aircraft.id] || "/default-aircraft.jpg"} 
                alt={`Aircraft ${aircraft.Tail_Number}`}
              />

              <h3>TSMOH: {aircraft.TSMOH ?? "N/A"}</h3>
              <h3>Time Remaining: {aircraft.TimeRemaining ?? "N/A"}</h3>
              <h3>Equipment List: [Coming Soon]</h3>

              {/* 🚀 Link to Dynamic Aircraft Flight Time Page */}
              <Link href={`/aircraft/${aircraft.Tail_Number}`}>
                <button className="button">Aircraft Flight Time</button>
              </Link>

              {/* 🚀 Link to Aircraft Logbooks (if applicable) */}
              <Link href={`/logbooks/${aircraft.Tail_Number}`}>
                <button className="button">Aircraft Logbooks</button>
              </Link>
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