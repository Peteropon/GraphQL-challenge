const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    members: [Member]
  }
  type Member {
    name: String
    department: String
    role: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql running at ${url}`);
});
