const members = require("./members");

module.exports = {
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
    node(parent) {
      return members.find((m) => m.id === parent.id);
    },
    cursor: (parent) => parent.id,
  },
  PageInfo: {
    endCursor: (parent) => parent[parent.length - 1].id,
    hasNextPage: (parent) => {
      const nextPage = members.slice(parseInt(parent[parent.length - 1].id));
      return nextPage.length > 0;
    },
    hasPreviousPage: (parent) => {
      const prevPage = members.slice(0, parseInt(parent[0].id - 1));
      return prevPage.length > 0;
    },
  },
};
