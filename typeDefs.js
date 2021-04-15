const { gql } = require("apollo-server");

module.exports = gql`
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
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }
`;
