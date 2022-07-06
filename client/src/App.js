import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// establish link to graphql server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

// instantiate apollo client instance and create connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  // instantiate new cache using InMemoryCache
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;

/** NOTES
 * ApolloProvider - special React component that is used to provide data to all of the other components
 * ApolloClient - constructor function that will help initialize connection to GraphQL API server
 * InMemoryCache - enables Apollo Client Instance to cache API response data for more efficient 
 * request performance
 * createHttpLink - allows for control of how the ApolloClient makes requests (like middleware for
 * outbound network requests)
 * 
 * IN APP: wrapping the entire JSX code with ApolloProvider with the client variable passed in
 * as the value for the client prop, so that everything in between the JSX tags will have access
 * to the server's API through the client variable
 */

