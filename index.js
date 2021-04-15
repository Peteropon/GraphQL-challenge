const { ApolloServer, gql } = require("apollo-server");
const resolvers = require("./resolvers");

const typeDefs = gql`
  type Query {
    members: [Member]
    memberConnection(first: String, after: String): MemberConnection
  }

  type MemberConnection {
    totalCount: Int
    edges: [Edge]
    pageInfo: PageInfo
  }

  type Edge {
    node: Member
    cursor: String
  }

  type Member {
    id: String
    name: String
    department: String
    role: String
  }

  type PageInfo {
    endCursor: String
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql running at ${url}`);
});
