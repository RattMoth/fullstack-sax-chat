import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import './App.css';
import AuthContext from './stores/authContext';
import { SetlistContextProvider } from './stores/setlistContext';

function App() {
  const { user, login, authReady } = useContext(AuthContext);

  return (
    <div>
      {/* Don't display anything until authReady has loaded, then conditionally display page based on logged-in status */}
      {authReady && (
        <div>
          {!user ? (
            <Login />
          ) : (
            <SetlistContextProvider>
              <Main />
            </SetlistContextProvider>
          )}
        </div>
      )}
      {/* TODO: maybe build loading indicator if load time is longer than n seconds */}
    </div>
  );
}

export default App;
