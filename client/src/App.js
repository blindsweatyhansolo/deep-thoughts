import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { 
  ApolloProvider, 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink 
} from '@apollo/client';


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


// establish link to graphql server
const httpLink = createHttpLink({
  uri: '/graphql',
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
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/thought/:id" element={<SingleThought />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>
        <Footer />
      </div>
      </Router>
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
 * Wrapping elements in the <Router> component makes all the child components on the page aware
 * of the client-side routing
 * <Router> component will always contain within it the <Routes> component, and the <Routes> component
 * will contain within it the <Route> component
 */

