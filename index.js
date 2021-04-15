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

const resolvers = {
  Query: {
    members: () => members,
    memberConnection(parent, { first, after, ...args }, context) {
      const filteredMembers = members.slice(
        parseInt(after),
        parseInt(after) + parseInt(first)
      );
      return filteredMembers;
    },
  },
  MemberConnection: {
    totalCount: () => members.length,
    edges: (parent) => parent,
    pageInfo: (parent) => parent,
  },
  Edge: {
    node(parent, args, context, info) {
      return members.find((m) => m.id === parent.id);
    },
    cursor: (parent) => parent.id,
  },
  PageInfo: {
    endCursor: (parent, args, context) => parent[parent.length - 1].id,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql running at ${url}`);
});
