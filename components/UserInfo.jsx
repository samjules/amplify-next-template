"use client";

import React, { useState } from "react";
import "../app/app.css";
import { generateClient } from "aws-amplify/data";
import { StorageManager } from "@aws-amplify/ui-react-storage";

const client = generateClient();

const Profile = () => {
  const [formData, setFormData] = useState({
    Model: "",
    name: "",
    profilePictureKey: "",
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
      await client.models.UserProfile.create({
        name: formData.name,
        profilePictureKey: formData.profilePictureKey,  
      });

      alert("profile added successfully!");
      setFormData({
        Model: "",
        name: "",
        profilePictureKey: "",
      });
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Failed to add profile.");
    }
  };

  return (
    <div className="main-menu">

      <h2>Change Profile</h2>
      <form className="flight_time" onSubmit={handleSubmit}>
        
        {/* 🔹 File Upload Drop Zone */}
        <div>
          <label className="label">Upload Aircraft Image</label>
          <StorageManager
            path="profile_pictures/"  // 🔹 Uploads images to "pictures/" in S3
            acceptedFileTypes={["image/*"]}
            maxFileCount={1}
            onUploadSuccess={handleFileUpload}
          />
        </div>

        <div>
          <label className="label">Name</label>
          <input className="input" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <button className="button" type="submit">Change Profile</button>
      </form>
    </div>
  );
};

export default Profile;