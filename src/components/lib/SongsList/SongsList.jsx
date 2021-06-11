/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import './SongsList.css';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';

export default function SongsList(props) {
  const [checked, setChecked] = React.useState([0]);
  const { category } = props;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const arr =
    category === 'Anime'
      ? [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 19, 11, 12, 13, 14, 15, 16, 17, 19, 11,
          12, 13, 14, 15, 16, 17, 19, 11, 12, 13, 14, 15, 16, 17, 19, 11, 12,
          13, 14, 15, 16, 17, 19,
        ]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <List id="list">
      {arr.map((value) => {
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
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value}`} />
          </ListItem>
        );
      })}
    </List>
  );
}
