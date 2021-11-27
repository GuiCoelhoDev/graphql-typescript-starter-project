import { applyMiddleware } from "graphql-middleware";
import { makeSchema } from "nexus";
import path from "path";

import { loginTypes } from "./graphql/Login";
import { userTypes } from "./graphql/User";
import { permissions } from "./permissions";

const publicSchema = makeSchema({
  types: [userTypes, loginTypes],
  outputs: {
    schema: path.join(__dirname, "generated/schema.gen.graphql"),
    typegen: path.join(__dirname, "generated/nexusTypes.gen.ts"),
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

export const schema = applyMiddleware(publicSchema, permissions);
