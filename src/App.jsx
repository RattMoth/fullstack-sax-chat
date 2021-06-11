import React, { useContext, useEffect } from 'react';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import './App.css';
import AuthContext from './stores/authContext';

function App() {
  const { user, login, authReady } = useContext(AuthContext);

  console.log('user: ', user);

  return (
    <div>
      {/* Don't display anything until authReady has loaded, then conditionally display page based on logged-in status */}
      {authReady && <div>{!user ? <Login /> : <Main />}</div>}
      {/* TODO maybe build loading indicator if load time is longer than n seconds */}
    </div>
  );
}

export default App;
