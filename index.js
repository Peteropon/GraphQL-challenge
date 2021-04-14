const { ApolloServer, gql } = require("apollo-server");
const members = require("./members");

const typeDefs = gql`
  type Query {
    members: [Member]
    memberConnection(first: String, after: String): MemberConnection
  }

  type MemberConnection {
    totalCount: Int
    edges: [Edge]
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
`;

const resolvers = {
  Query: {
    members: () => members,
    memberConnection(parent, { first, after, ...args }, context) {
      return members.slice(parseInt(after), parseInt(after) + parseInt(first));
    },
  },
  MemberConnection: {
    totalCount: () => members.length,
    edges(parent) {
      return parent;
    },
  },
  Edge: {
    node(parent, args, context, info) {
      return members.find((m) => m.id === parent.id);
    },
    cursor: (parent) => parent.id,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql running at ${url}`);
});

//   type PageInfo {
//     endCursor: String
//     hasNextPage: Boolean
//   }
