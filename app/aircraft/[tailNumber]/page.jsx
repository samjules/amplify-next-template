"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use router to get dynamic params
import { generateClient } from "aws-amplify/data";
import { getUrl } from "@aws-amplify/storage";


const client = generateClient();

const AircraftDetails = ({ params }) => {
  const { tailNumber } = params; // Get the dynamic tailNumber from the URL
  const [aircraft, setAircraft] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchAircraft = async () => {
      try {
        const { data } = await client.models.Aircraft.list({
          filter: { Tail_Number: { eq: tailNumber } },
        });

        if (data.length > 0) {
          setAircraft(data[0]);

          // Fetch the image from S3 if available
          if (data[0].imageKey) {
            const url = await getUrl({ path: `aircraft-images/${data[0].imageKey}` });
            setImageUrl(url);
          }
        }
      } catch (error) {
        console.error("Error fetching aircraft details:", error);
      }
    };

    fetchAircraft();
  }, [tailNumber]);

  if (!aircraft) {
    return <p>Loading aircraft details...</p>;
  }

  return (
    <div className="aircraft_card">
      <h1>Aircraft: {aircraft.Tail_Number}</h1>
      {imageUrl && <img src={imageUrl} alt={`Aircraft ${aircraft.Tail_Number}`} />}
      <p>Model: {aircraft.Model}</p>
      <p>TSMOH: {aircraft.TSMOH}</p>
      <p>Time Remaining: {aircraft.TimeRemaining}</p>
    </div>
  );
};

export default AircraftDetails;