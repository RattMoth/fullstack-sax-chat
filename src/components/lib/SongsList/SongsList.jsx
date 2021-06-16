import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import './SongsList.css';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import SetlistContext from '../../../stores/setlistContext';

export default function SongsList({ songs }) {
  const { setlistSongs, setSetlistSongs } = useContext(SetlistContext);

  // TODO reactivate this. Disabled to prevent extra DB calls
  // useEffect(() => {
  //   fetch(`/.netlify/functions/get-songs-by-category?category=${categoryURL}`)
  //     .then((res) => res.json())
  //     .then((songs) => setFetchedSongs(songs))
  //     .catch((error) => {
  //       // eslint-disable-next-line no-console
  //       console.error(error);
  //     });
  // }, [categoryURL]);

  const handleToggle = (value) => () => {
    const currentIndex = setlistSongs.indexOf(value);
    const newChecked = [...setlistSongs];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSetlistSongs(newChecked);
  };

  return (
    <List id="list">
      {songs ? (
        songs.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={setlistSongs.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })
      ) : (
        // Todo reenable loading spinner
        <ReactLoading type="spin" color="#3f51b5" />
        // <div>still loadin</div>
      )}
    </List>
  );
}
