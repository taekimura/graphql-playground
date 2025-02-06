const bcrypt = require('bcryptjs');

async function signup(parent, args, context) {
  // set up password
  const password = await bcrypt.hash(args.password, 10);

  // create user info
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password
    }
  });
}
