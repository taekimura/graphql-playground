const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../utils');

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

async function login(parent, args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  });
  if (!user) {
    throw new Error('そのようなユーザーは存在しません');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('無効なパスワードです');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function post(parent, args, context) {
  //分割代入で取り出す
  const { userId } = context;
  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  });
}

module.exports = {
  signup,
  login,
  post
};
