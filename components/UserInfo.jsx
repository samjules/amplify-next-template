"use client";

import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { StorageManager } from "@aws-amplify/ui-react-storage";

const UserInfo = () => {
  const [displayName, setDisplayName] = useState("");
  const [profilePictureKey, setProfilePictureKey] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Fetch current user attributes on mount
  useEffect(() => {
    const fetchUserAttributes = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setDisplayName(user.attributes["custom:display_name"] || "");
        setProfilePictureKey(user.attributes["custom:profile_picture_key"] || "");
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    fetchUserAttributes();
  }, []);

  // 🔹 Handles successful file upload
  const handleFileUpload = async ({ key }) => {
    setProfilePictureKey(key);
  };

  // 🔹 Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.currentAuthenticatedUser();
      
      await Auth.updateUserAttributes(user, {
        "custom:display_name": displayName,
        "custom:profile_picture_key": profilePictureKey,  // Store S3 image key in Cognito
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="main-menu">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={16}
          />
        </div>

        {/* 🔹 File Upload Drop Zone */}
        <div>
          <label>Upload Profile Picture:</label>
          <StorageManager
            path="profile-pictures/"
            acceptedFileTypes={["image/*"]}
            maxFileCount={1}
            onUploadSuccess={handleFileUpload}
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UserInfo;