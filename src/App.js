import React from 'react';
import Basic from './Layout/Basic'
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App() {
  return (
    <Authenticator signUpAttributes={[]} socialProviders={['facebook', 'google']}>
      {({ signOut, user }) => (
        <Router>
          <Switch>
            <Route path="/" render={() => <Basic user={user} signOut={signOut} />}>
            </Route>
            <Redirect from="/" to="/dashboard/home" />
          </Switch>
        </Router>
      )}
    </Authenticator>
  )
}

export default App;
