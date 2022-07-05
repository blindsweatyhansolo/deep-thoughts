const express = require('express');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import typeof and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create new Apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create new instance of Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate Apollo server with the Express app as middleware
  server.applyMiddleware({ app });

  // once() used in conditions where a function is to be executed only once
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
};

// call the async function to start server
startApolloServer(typeDefs, resolvers);