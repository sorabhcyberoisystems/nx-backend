import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/hello",
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
      },
    },
  ],
};
