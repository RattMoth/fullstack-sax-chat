import React, { createContext, useEffect, useState } from 'react';

const SetlistContext = createContext({
  setlistSongs: [],
  setSetlistSongs: () => {},
});

export function SetlistContextProvider({ children }) {
  const [setlistSongs, setSetlistSongs] = useState([]);

  return (
    <SetlistContext.Provider value={{ setlistSongs, setSetlistSongs }}>
      {children}
    </SetlistContext.Provider>
  );
}

export default SetlistContext;
