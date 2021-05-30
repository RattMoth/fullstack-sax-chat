import React, { useContext } from 'react';
import AuthContext from '../../stores/authContext';

export default function Main() {
  const { user, login } = useContext(AuthContext);
  return (
    <>
      <h2>Mainpage for {user}</h2>
      <button type="button" onClick={login}>
        Login/signup
      </button>
    </>
  );
}
