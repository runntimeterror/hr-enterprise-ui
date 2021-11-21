import React from 'react';
import Basic from './Layout/Basic'
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App() {
  return (
    <Authenticator signUpAttributes={[]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <div className="App">
            <header className="App-header">
              <div className="dashboard-wrapper">
                <Router>
                  <Routes>
                    <Route path="/" exact element={Basic} />
                  </Routes>
                </Router>
              </div>
            </header>
          </div>
        </main>
      )}
    </Authenticator>
  )
}

export default App;
