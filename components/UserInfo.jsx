"use client";

import React, { useState } from "react";
import "../app/app.css";
import { generateClient } from "aws-amplify/data";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { Auth } from "aws-amplify";

const client = generateClient();

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    profilePictureKey: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handles successful file upload
  const handleFileUpload = async ({ key }) => {
    setFormData((prev) => ({ ...prev, profilePictureKey: key }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the current authenticated user's info
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub; // Use the `sub` as the user ID (unique identifier)

      // Create or update the user profile
      await client.models.UserProfile.create({
        userId: userId,  // Make sure userId is passed here
        name: formData.name,
        profilePictureKey: formData.profilePictureKey,  // Profile picture key from S3
      });

      alert("Profile updated successfully!");
      setFormData({
        name: "",
        profilePictureKey: "",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="main-menu">
      <h2>Change Profile</h2>
      <form className="flight_time" onSubmit={handleSubmit}>
        {/* 🔹 File Upload Drop Zone */}
        <div>
          <label className="label">Upload Profile Picture</label>
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

        <button className="button" type="submit">
          Change Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;