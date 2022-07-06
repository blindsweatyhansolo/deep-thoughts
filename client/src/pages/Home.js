import React from 'react';
// import useQuery hook to allow for requests to the GraphQL server connection from 
// ApolloProvider in App.js
import { useQuery } from '@apollo/client';
// import query for all thoughts defined in utils/queries
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request
  // loading property conditionally renders data based on wether or not data is available to display
  // returned data is stored in the desctructed data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // optional chaining - negates the need to check if an object even exists before accessing its
  // properties; if data exists, store it in the thoughts constant, if data is undefined then
  // save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  // console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading . . .</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s). . ." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
