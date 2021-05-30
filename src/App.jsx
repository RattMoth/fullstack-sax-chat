import React, { useContext, useEffect } from 'react';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import './App.css';
import AuthContext from './stores/authContext';

function App() {
  const { user, login, authReady } = useContext(AuthContext);

  console.log('user: ', user);
  console.log('authReady: ', authReady);

  return (
    <div className="wrapper">
      <h1>Header</h1>
      {/* Don't display anything until authReady has loaded, then conditionally display page based on logged-in status */}
      {authReady && <div>{!user ? <Login /> : <Main />}</div>}
    </div>
  );
}

export default App;
