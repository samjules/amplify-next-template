import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Aircraft: a
    .model({
      Tail_Number: a.string(),
      Model: a.string(),
      imageKey: a.string(),  // 🔹 Stores path to the image in "pictures/"
      logbookKey: a.string(),
      TimeRemaining: a.integer(),
      TSMOH: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  FlightTime: a
    .model({
      startHobbs: a.integer(),
      endHobbs: a.integer(),
      startTach: a.integer(),
      endTach: a.integer(),
      pilot: a.string(),
      aircraftId: a.string(), 
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});