"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { StorageManager, getUrl, uploadData } from "@aws-amplify/storage";

const client = generateClient();

const UserProfileSettings = () => {
  const [profile, setProfile] = useState({ name: "", profilePictureKey: "" });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await client.models.UserProfile.list();
        if (data.length > 0) {
          setProfile(data[0]); // Assuming one profile per user
          if (data[0].profilePictureKey) {
            const url = await getUrl({ path: data[0].profilePictureKey });
            setImageUrl(url);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUploadSuccess = async ({ key }) => {
    setProfile((prev) => ({ ...prev, profilePictureKey: key }));
    const url = await getUrl({ path: key });
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.models.UserProfile.create({
        name: profile.name,
        profilePictureKey: profile.profilePictureKey,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-settings">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        
        <label>Profile Picture:</label>
        <StorageManager
          path="profile-pictures/"
          acceptedFileTypes={["image/*"]}
          maxFileCount={1}
          onUploadSuccess={handleUploadSuccess}
        />
        {imageUrl && <img src={imageUrl} alt="Profile Preview" className="profile-image" />}
        
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfileSettings;