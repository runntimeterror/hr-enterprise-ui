import React from 'react';
import Basic from './Layout/Basic'
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

var urlsIn = config.oauth.redirectSignIn.split(",");
var urlsOut = config.oauth.redirectSignOut.split(",");
const oauth = {
  domain: config.oauth.domain,
  scope: config.oauth.scope,
  redirectSignIn: config.oauth.redirectSignIn,
  redirectSignOut: config.oauth.redirectSignOut,
  responseType: config.oauth.responseType
};
var hasLocalhost  = (hostname) => Boolean(hostname.match(/localhost/) || hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/));
var hasHostname   = (hostname) => Boolean(hostname.includes(window.location.hostname));
var isLocalhost   = hasLocalhost(window.location.hostname);
if (isLocalhost) {
  urlsIn.forEach((e) =>   { if (hasLocalhost(e)) { oauth.redirectSignIn = e; }});
  urlsOut.forEach((e) =>  { if (hasLocalhost(e)) { oauth.redirectSignOut = e; }});
}
else {
  urlsIn.forEach((e) =>   { if (hasHostname(e)) { oauth.redirectSignIn = e; }});
  urlsOut.forEach((e) =>  { if (hasHostname(e)) { oauth.redirectSignOut = e; }});
}
var configUpdate = config;
configUpdate.oauth = oauth;
Amplify.configure(configUpdate);
Auth.configure(configUpdate);

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
