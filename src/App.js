import React from 'react';
import logo from './logo.svg';
import Dashboard from './Dashboard'
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App() {
  return(
    <Authenticator signUpAttributes={[]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <div className="App">
            <header className="App-header">
              <div className="dashboard-wrapper">
                <Dashboard />
              </div>
            </header>
          </div>
        </main>
      )}
    </Authenticator>
  )
}

export default App;
