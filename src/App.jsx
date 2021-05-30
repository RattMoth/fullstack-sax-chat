import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import './App.css';
import { AuthContextProvider } from './stores/authContext';

function App() {
  return (
    <AuthContextProvider>
      <div className="wrapper">
        <h1>App go here</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
