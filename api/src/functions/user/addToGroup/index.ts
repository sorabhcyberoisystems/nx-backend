import { handlerPath } from "@libs/handlerResolver";

const postConfirmationEvent: {
  cognitoUserPool: {
    pool: string;
    trigger:
      | "PreSignUp"
      | "PostConfirmation"
      | "PreAuthentication"
      | "PostAuthentication"
      | "PreTokenGeneration"
      | "CustomMessage"
      | "DefineAuthChallenge"
      | "CreateAuthChallenge"
      | "VerifyAuthChallengeResponse"
      | "UserMigration";
    existing?: boolean;
  };
} = {
  cognitoUserPool: {
    pool: "FutureBrightPool",
    trigger: "PostConfirmation",
    existing: true,
  },
};

export const addUserToGroup = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [postConfirmationEvent],
};
