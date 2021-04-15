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
    node(parent, args, context, info) {
      return members.find((m) => m.id === parent.id);
    },
    cursor: (parent) => parent.id,
  },
  PageInfo: {
    endCursor: (parent, args, context) => parent[parent.length - 1].id,
  },
};
