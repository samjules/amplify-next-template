"use client";

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "@aws-amplify/storage";
import { Auth } from "aws-amplify";

const client = generateClient();

const WelcomeBar = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    profilePictureKey: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the current authenticated user
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.attributes.sub; // Assuming 'sub' is the user ID

        // Fetch user profile data
        const { data } = await client.models.UserProfile.query({
          userId: userId, // Query the profile using userId
        });

        if (data.length > 0) {
          const profile = data[0];
          setUserProfile({
            name: profile.name,
            profilePictureKey: profile.profilePictureKey,
          });

          // Fetch profile picture URL if exists
          if (profile.profilePictureKey) {
            const url = await getUrl({ path: profile.profilePictureKey });
            setImageUrl(url);
          } else {
            setImageUrl("/default-image.png"); // Default image if no profile picture
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setImageUrl("/default-image.png"); // Fallback if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="welcomebar">
      <div className="welcome_image">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <img
            src={imageUrl}
            alt={userProfile.name ? `${userProfile.name}'s Profile` : "User Profile"}
          />
        )}
      </div>

      <div className="welcome_text">
        <div>
          <h2>Hello, {userProfile.name || "User"}</h2>
        </div>

        <div>
          <p>
            “When once you have tasted flight, you will forever walk the earth
            with your eyes turned skyward, for there you have been, and there
            you will always long to return.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBar;