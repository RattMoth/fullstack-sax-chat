import React, { createContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export function AuthContextProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState('matt');

  useEffect(() => {
    // init netlify identity connection on component load
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const context = { user, login };

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
