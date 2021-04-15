const members = require("./members");

module.exports = {
  Query: {
    members: () => members,
    memberConnection(parent, { first, after, sort, ...args }, context) {
      const requestedMembers = members.slice(
        parseInt(after),
        parseInt(after) + parseInt(first)
      );
      const endCursor = requestedMembers[requestedMembers.length - 1].id;
      const startCursor = requestedMembers[0].id;

      return {
        startCursor,
        endCursor,
        result:
          sort.order === "ASC"
            ? requestedMembers.sort((a, b) =>
                a[sort.field] > b[sort.field] ? 1 : -1
              )
            : requestedMembers.sort((a, b) =>
                a[sort.field] < b[sort.field] ? 1 : -1
              ),
      };
    },
  },
  MemberConnection: {
    totalCount: () => members.length,
    edges: (parent) => parent.result,
    pageInfo: ({ startCursor, endCursor }) => {
      return {
        startCursor,
        endCursor,
      };
    },
  },
  Edge: {
    node(parent) {
      return members.find((m) => m.id === parent.id);
    },
    cursor: (parent) => parent.id,
  },
  PageInfo: {
    endCursor: ({ endCursor }) => endCursor,
    hasNextPage: ({ endCursor }) => {
      const nextPage = members.slice(parseInt(endCursor));
      return nextPage.length > 0;
    },
    hasPreviousPage: ({ startCursor }) => {
      const prevPage = members.slice(0, parseInt(startCursor - 1));
      return prevPage.length > 0;
    },
  },
};
