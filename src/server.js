const { ApolloServer, gql } = require('apollo-server');

//　GraphQLのスキーマ定義
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

//　resolver関数
const resolvers = {
  Query: {
    info: () => 'HackerNews Clone'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`${url} server is running...`));
