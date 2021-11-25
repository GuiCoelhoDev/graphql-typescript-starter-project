import { ApolloServer } from "apollo-server";

import { createContext } from "./context";
import { schema } from "./schema";

// NOTE: schema requires graphql v14.6.0, otherwises sends type error
// https://github.com/graphql-nexus/nexus-plugin-prisma/issues/588
// https://github.com/dotansimha/graphql-yoga/issues/573
const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen().then(({ url }: { url: string }) => console.log(`🚀 Server ready at: ${url}`));
