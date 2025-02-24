import { defineAuth } from "@aws-amplify/backend"

export const auth = defineAuth({
  loginWith: {
    // this configures a required "email" attribute
    email: true,
  },
  userAttributes: {
    "custom:display_name": {
      dataType: "String",
      mutable: true,
      maxLen: 16,
      minLen: 1,
    },
    
    "custom:profile_picture_key": {
      dataType: "String",
      mutable: true,
      maxLen: 255,
  
  },

    
  },
})