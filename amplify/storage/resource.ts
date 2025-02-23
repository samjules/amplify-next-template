import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "aircraft-images",
  // Amplify automatically handles access control via the backend configuration
});