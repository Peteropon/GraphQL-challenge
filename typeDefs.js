const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    members: [Member]
    memberConnection(
      first: String
      after: String
      sort: Sort
    ): MemberConnection!
  }

  type MemberConnection {
    totalCount: Int
    edges: [Edge]!
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

  input Sort {
    order: Order = ASC
    field: Field
  }

  enum Order {
    ASC
    DESC
  }

  enum Field {
    name
    role
    department
  }
`;
