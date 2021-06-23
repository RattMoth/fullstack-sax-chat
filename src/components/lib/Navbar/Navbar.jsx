import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AuthContext from '../../../stores/authContext';
import './Navbar.css';
import AddSongModal from '../../Modal/AddSongModal';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function Navbar({ categories, update }) {
  const { user, login } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={classes.grow}>
      {/* Modal lives here in navbar */}
      <AddSongModal
        categories={categories}
        open={modalIsOpen}
        handleModalClose={handleModalClose}
        update={update}
      />
      {/* End modal */}
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            S4X Song Dashboard
          </Typography>
          <Button
            className="addButton"
            onClick={handleModalOpen}
            variant="contained"
          >
            + Add Song
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div>
              Logged in as {user.user_metadata.full_name}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={login}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
