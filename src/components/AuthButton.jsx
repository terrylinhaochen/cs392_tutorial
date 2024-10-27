import React from 'react';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const SignInButton = () => (
  <button className="btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = ({ user }) => (
  <div className="d-flex align-items-center">
    <span className="px-2">{user.displayName}</span>
    <button className="btn btn-dark" onClick={signOut}>Sign out</button>
  </div>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton user={user} /> : <SignInButton />;
};

export default AuthButton;