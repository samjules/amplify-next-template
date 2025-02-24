import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  Aircraft: a
    .model({
      Tail_Number: a.string(),
      Model: a.string(),
      imageKey: a.string(),
      logbookKey: a.string(),
      TimeRemaining: a.integer(),
      TSMOH: a.integer(),
    })
    .authorization((allow) => [allow.owner()]),

  FlightTime: a
    .model({
      startHobbs: a.integer(),
      endHobbs: a.integer(),
      startTach: a.integer(),
      endTach: a.integer(),
      pilot: a.string(),
      aircraftId: a.string(), 
    })
    .authorization((allow) => [allow.authenticated()]),

  UserProfile: a
    .model({
      userId: a.string(),  // Unique identifier for the user
      name: a.string(),  // User's name
      profilePictureKey: a.string(),  // Profile picture key
    })
    .authorization((allow) => [allow.authenticated().to(["create", "read", "update"])]), // Only authenticated users can modify their profile
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",  // 🔹 Matches the first file
  },
});