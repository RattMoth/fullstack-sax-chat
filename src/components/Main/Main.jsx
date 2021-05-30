/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../stores/authContext';

export default function Main() {
  const { user, login } = useContext(AuthContext);

  return (
    <>
      <h2>Mainpage for {user.user_metadata.full_name}</h2>
      <button type="button" onClick={login}>
        Logout
      </button>
    </>
  );
}
