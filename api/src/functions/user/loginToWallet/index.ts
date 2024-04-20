import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/wallet-login",
        authorizer: {
          name: "futureBrightJwtAuthorizer",
        },
        headerParameters: {
          Authorization: {
            required: true,
            type: "string",
            description: "JWT Token",
          },
        },
        request: {
          schema: {
            "application/json": schema,
          },
        },
        bodyType: 'LoginToWalletRequestBody'
      },
    },
  ],
};
