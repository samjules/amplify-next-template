"use client";

import React, { useState } from "react";
import "../app/app.css";
import { generateClient } from "aws-amplify/data";
import { StorageManager } from "@aws-amplify/ui-react-storage";

const client = generateClient();

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    profilePictureKey: "",  // Correct field name here
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handles successful file upload
  const handleFileUpload = async ({ key }) => {
    setFormData((prev) => ({ ...prev, profilePictureKey: key }));  // Correct field name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a `UserProfile` model in your backend.
      await client.models.UserProfile.create({
        name: formData.name,
        profilePictureKey: formData.profilePictureKey,  // Uploads the image key
      });

      alert("Profile updated successfully!");
      setFormData({
        name: "",
        profilePictureKey: "",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="main-menu">
      <h2>Change Profile</h2>
      <form className="flight_time" onSubmit={handleSubmit}>
        
        {/* 🔹 File Upload Drop Zone */}
        <div>
          <label className="label">Upload Profile Picture</label> {/* Updated label */}
          <StorageManager
            path="profile_pictures/"  // 🔹 Uploads images to "profile_pictures/" in S3
            acceptedFileTypes={["image/*"]}
            maxFileCount={1}
            onUploadSuccess={handleFileUpload}
          />
        </div>

        <div>
          <label className="label">Name</label>
          <input
            className="input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <button className="button" type="submit">Change Profile</button>
      </form>
    </div>
  );
};

export default Profile;