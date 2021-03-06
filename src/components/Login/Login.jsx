/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../stores/authContext';
import './Login.css';

export default function Login() {
  const { login } = useContext(AuthContext);

  useEffect(() => login());
  return (
    <div id="loginContainer">
      <h2>Login page</h2>
      <button type="button" onClick={login}>
        Click this if the popup disappeared
      </button>
    </div>
  );
}
