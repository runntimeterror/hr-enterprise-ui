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
    <Authenticator signUpAttributes={[]}>
      {({ signOut, user }) => (
        <div className="App">
          <header className="App-header">
            <div className="dashboard-wrapper">
              <Router>
                <Switch>
                  <Route path="/" component={Basic}>
                  </Route>
                  <Redirect from="/" to="/dashboard/home" />
                </Switch>
              </Router>
            </div>
          </header>
        </div>

      )}
    </Authenticator>
  )
}

export default App;
