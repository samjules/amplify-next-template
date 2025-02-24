"use client";

import React, { useState } from "react";
import "../app/app.css";
import { generateClient } from "aws-amplify/data";
import { StorageManager } from "@aws-amplify/ui-react-storage";

const client = generateClient();

const AddAircraft = () => {
  const [formData, setFormData] = useState({
    Tail_Number: "",
    Model: "",
    imageKey: "",
    logbookKey: "",
    TimeRemaining: "",
    TSMOH: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handles successful file upload
  const handleFileUpload = async ({ key }) => {
    setFormData((prev) => ({ ...prev, imageKey: key }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.models.Aircraft.create({
        Tail_Number: formData.Tail_Number,
        Model: formData.Model,
        imageKey: formData.imageKey,  // 🔹 Stores image path from S3
        logbookKey: formData.logbookKey,
        TimeRemaining: parseInt(formData.TimeRemaining),
        TSMOH: parseInt(formData.TSMOH),
      });

      alert("Aircraft added successfully!");
      setFormData({
        Tail_Number: "",
        Model: "",
        imageKey: "",
        logbookKey: "",
        TimeRemaining: "",
        TSMOH: "",
      });
    } catch (error) {
      console.error("Error adding aircraft:", error);
      alert("Failed to add aircraft.");
    }
  };

  return (
    <div className="main-menu">

      <h2>Add Aircraft</h2>
      <form className="flight_time" onSubmit={handleSubmit}>
        <div>
          <label className="label">Tail Number</label>
          <input className="input" name="Tail_Number" value={formData.Tail_Number} onChange={handleChange} />
        </div>

        <div>
          <label className="label">Model</label>
          <input className="input" name="Model" value={formData.Model} onChange={handleChange} />
        </div>

        {/* 🔹 File Upload Drop Zone */}
        <div>
          <label className="label">Upload Aircraft Image</label>
          <StorageManager
            path="pictures/"  // 🔹 Uploads images to "pictures/" in S3
            acceptedFileTypes={["image/*"]}
            maxFileCount={1}
            onUploadSuccess={handleFileUpload}
          />
        </div>

        <div>
          <label className="label">Logbook Key</label>
          <input className="input" name="logbookKey" value={formData.logbookKey} onChange={handleChange} />
        </div>

        <div>
          <label className="label">Time Remaining</label>
          <input className="input" name="TimeRemaining" value={formData.TimeRemaining} onChange={handleChange} />
        </div>

        <div>
          <label className="label">TSMOH</label>
          <input className="input" name="TSMOH" value={formData.TSMOH} onChange={handleChange} />
        </div>

        <button className="button" type="submit">Add Aircraft</button>
      </form>
    </div>
  );
};

export default AddAircraft;