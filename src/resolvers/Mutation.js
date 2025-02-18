const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

APP_SECRET = 'Graphql';

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

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}
