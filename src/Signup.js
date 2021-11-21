import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, AmplifyAuthContainer } from '@aws-amplify/ui-react';

const Signup = () => {
return(
    <AmplifySignUp slot="sign-up" formFields={[
        {
          type: "username",
          label: "username",
          placeholder: "username",
          inputProps: { required: true, autocomplete: "username" },
        },
        {
          type: "password",
          label: "Password",
          placeholder: "Password",
          inputProps: { required: true, autocomplete: "new-password" },
        }
      ]}
      />
)
 }

 export default Signup