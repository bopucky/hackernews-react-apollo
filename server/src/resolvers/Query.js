async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    count
  };
}

//users listing resolver
async function members(parent, args, context, info) {
  const users = await context.prisma.user.findMany();
  const count = await context.prisma.user.count();

  //@NOTE This produces error message when querying, so can't use
  //Error: Expected iterable, but did not find one for field Query.members
  /*return {
    id: 'main-users',
    users,
    count
  };*/

  // Just return users list object directly instead
  return users;
}

module.exports = {
  feed,
  members
};
