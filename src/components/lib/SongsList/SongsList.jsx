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

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SetlistContext from '../../../stores/setlistContext';

export default function SongsList({ songs, handleModalOpen }) {
  const { setlistSongs, setSetlistSongs } = useContext(SetlistContext);

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
              className="list-item"
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
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => handleModalOpen(value)}
                  edge="end"
                  aria-label="edit button"
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      ) : (
        <ReactLoading type="spin" color="#3f51b5" />
      )}
    </List>
  );
}
