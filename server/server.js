const express = require('express');
// import apollo server
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// new appollo server to pass in our schema data 
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// intergrate our appollo server with the express application as middleware
server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can test our gql api 
    console.log(` use graphql at http://localhost:${PORT}${server.graphqlPath}`)
  });
});
