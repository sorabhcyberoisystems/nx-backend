import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

const hello = async () => {
  return formatJSONResponse({
    message: `Hello!! Welcome To Future Bright!!`,
  });
};

export const main = middyfy(hello);
