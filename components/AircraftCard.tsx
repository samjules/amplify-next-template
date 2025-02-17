"use client";




import React from "react";

interface AircraftCardProps {
  tailNumber: string;
  model: string;
  image?: string;
  timeRemaining: number;
  tsmoh: number;
}

const AircraftCard: React.FC<AircraftCardProps> = ({
  tailNumber,
  model,
  image,
  timeRemaining,
  tsmoh,
}) => {
  return (
    <div
      style={{
        width: 965,
        height: 212,
        padding: 10,
        background: "rgba(246, 246, 246, 0.33)",
        borderRadius: 25,
        overflow: "hidden",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
      }}
    >
      <div style={{ justifyContent: "flex-start", alignItems: "center", gap: 10, display: "flex" }}>
        <div>
          {image ? (
            <img src={image} alt={tailNumber} style={{ width: 163, height: 164, borderRadius: 10 }} />
          ) : (
            <svg width="163" height="164" viewBox="0 0 163 164" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="163" height="164" fill="#D9D9D9" />
            </svg>
          )}
        </div>
        <div
          style={{
            width: 169,
            height: 212,
            padding: 10,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 10,
            display: "inline-flex",
          }}
        >
          <div style={{ color: "white", fontSize: 16, fontFamily: "Inter", fontWeight: "400" }}>
            Tail Number: {tailNumber}
          </div>
          <div style={{ color: "white", fontSize: 16, fontFamily: "Inter", fontWeight: "400" }}>
            Model: {model}
          </div>
          <div style={{ color: "white", fontSize: 16, fontFamily: "Inter", fontWeight: "400" }}>
            Time Remaining: {timeRemaining} hrs
          </div>
          <div style={{ color: "white", fontSize: 16, fontFamily: "Inter", fontWeight: "400" }}>
            TSMOH: {tsmoh} hrs
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftCard;