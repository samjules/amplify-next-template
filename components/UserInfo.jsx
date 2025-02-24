"use client";

import React, { useState, useEffect } from "react";
import "../app/app.css";
import { generateClient } from "aws-amplify/data";
import { StorageManager } from "@aws-amplify/ui-react-storage";

const client = generateClient();

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageKey: "",
  });

  // Fetch user profile data on mount (for example purposes, assume the user already exists)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch the user profile from your data source (e.g., client.models.UserProfile)
        const { data } = await client.models.UserProfile.list();
        if (data.length > 0) {
          setFormData({ name: data[0].name, imageKey: data[0].profilePictureKey });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input changes for name
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload success (image upload)
  const handleFileUpload = async ({ key }) => {
    setFormData((prev) => ({ ...prev, imageKey: key }));
  };

  // Handle form submission (save profile changes)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.models.UserProfile.create({
        name: formData.name,
        profilePictureKey: formData.imageKey, // S3 image path
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        {/* Profile Image Upload Drop Zone */}
        <div>
          <label className="label">Upload Profile Image</label>
          <StorageManager
            path="profile-pictures/" // Images will be uploaded to S3 under this path
            acceptedFileTypes={["image/*"]}
            maxFileCount={1}
            onUploadSuccess={handleFileUpload}
          />
        </div>

        {/* Submit Button */}
        <button className="button" type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileSettings;