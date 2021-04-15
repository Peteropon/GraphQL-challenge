const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");

const typeDefs = require("./typeDefs");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql running at ${url}`);
});
