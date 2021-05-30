import React, { createContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Baked-in event listener. Fires on user login
    netlifyIdentity.on('login', (returnedUser) => {
      // function returns the logged in user from netllify
      setUser(returnedUser);
      netlifyIdentity.close();
      console.info('login event');
      console.log(returnedUser);
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
      console.info('logout event');
    });

    netlifyIdentity.on('init', (returnedUser) => {
      setUser(returnedUser);
      setAuthReady(true);
    });

    // init netlify identity connection on component load
    netlifyIdentity.init();

    // functions returned in useEffect fire when component unmounts
    return () => {
      // Deregester event listeners if component unmounts to prevent
      // duplicates. Prob unnecessary in this app, but it's good practice
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;

/**
 * To use this, first wrap all components that will need this data via:
 *      <AuthContextProvider>
 *        ...components here...
 *      </AuthContextProvider>
 *
 * Then import useContext and AuthContext in desired component. Then set
 * a variable (any name) via:
 *      const variable = useContext(AuthContext);
 * The component now has access to the context data and will update as the
 * data updates.
 */
