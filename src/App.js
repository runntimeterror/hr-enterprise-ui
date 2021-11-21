import React from 'react';
import logo from './logo.svg';
import Dashboard from './Dashboard'
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
// import Signup from './Signup'

Amplify.configure(awsconfig);

Auth.configure(awsconfig);



function App() {
  // const [authState, setAuthState] = React.useState();
  // const [user, setUser] = React.useState();

  // React.useEffect(() => {
  //   return onAuthUIStateChange((nextAuthState, authData) => {
  //     setAuthState(nextAuthState);
  //     console.log("authdata ==>", authData)
  //     setUser(authData)
  //   });
  // }, []);

  // return authState === AuthState.SignedIn && user ? (

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
