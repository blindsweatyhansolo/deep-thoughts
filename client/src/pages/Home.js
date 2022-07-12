import React from 'react';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
// import useQuery hook to allow for requests to the GraphQL server connection from 
// ApolloProvider in App.js
import { useQuery } from '@apollo/client';
// import query for all thoughts defined in utils/queries
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
  // use useQuery hook to make query request
  // loading property conditionally renders data based on wether or not data is available to display
  // returned data is stored in the desctructed data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // obj destructuring to extract 'data' from hook's response and name it userData
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // optional chaining - negates the need to check if an object even exists before accessing its
  // properties; if data exists, store it in the thoughts constant, if data is undefined then
  // save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
          {loggedIn && (
            <div className="col-12 mb-3">
              <ThoughtForm />
            </div>
          )}

        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading . . .</div>
          ) : (
            <ThoughtList 
              thoughts={thoughts} 
              title="Some Feed for Thought(s). . ." 
            />
          )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList 
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}

      </div>
    </main>
  );
};

export default Home;
