import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Popup({
  severity,
  message,
  visible,
  handlePopupOpen,
  handlePopupClose,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={visible}
        autoHideDuration={3000}
        onClose={handlePopupClose}
      >
        <MuiAlert elevation={6} variant="filled" severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
