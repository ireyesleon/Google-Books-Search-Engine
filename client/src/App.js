import React from 'react';
import { 
  ApolloClient, ApolloProvider, InMemoryCache, createHttpLink
 } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/AppNavbar';


const http = createHttpLink({ uri: '/graphql' });

const auth = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: { 
      ...headers,
      authorization: token ? `user ${token}` : "User not validated", 
    }
  }
});

const client = new ApolloClient({ 
  link: auth.concat(http), 
  cache: new InMemoryCache(), 
 })


function App() {
  return (
    <ApolloProvider client={client} >
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route 
            exact path='/'
            component={SearchBooks} 
          />
          <Route 
            exact path='/saved' 
            component={SavedBooks} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
