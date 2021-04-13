const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    members(name: String, department: String, role: String): [Member]
  }
  type Member {
    name: String
    department: String
    role: String
  }
`;

const resolvers = {
  Query: {
    members: () => members,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql running at ${url}`);
});

const members = [
  {
    name: "jon",
    department: "ddd",
    role: "leader",
  },
  {
    name: "kim",
    department: "mmm",
    role: "dev",
  },
  {
    name: "pam",
    department: "ddd",
    role: "dev",
  },
  {
    name: "fos",
    department: "mmm",
    role: "dev",
  },
  {
    name: "io",
    department: "ddd",
    role: "dev",
  },
];
