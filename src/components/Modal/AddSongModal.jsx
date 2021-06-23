import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ReactLoading from 'react-loading';
import usePopup from '../lib/Popup/usePopup';
import Popup from '../lib/Popup/Popup';
import './Modal.css';
import { severityEnum } from '../lib/enums/severityEnum';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddSongModal({
  categories,
  open,
  handleModalClose,
  update,
}) {
  const classes = useStyles();
  const [newSongName, setNewSongName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [returnedError, setReturnedError] = useState(false);
  const { visible, handlePopupOpen, handlePopupClose } = usePopup();

  const handleSongNameChange = (e) => {
    if (returnedError) {
      setReturnedError(false);
    }
    setNewSongName(e.target.value);
  };

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClose = () => {
    handlePopupClose();
    handleModalClose();
    setSelectedCategory('');
    setNewSongName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const songData = {
      name: newSongName,
      category: selectedCategory,
    };
    setLoading(true);
    fetch(' /.netlify/functions/create-song/', {
      body: JSON.stringify(songData),
      method: 'POST',
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) {
          setReturnedError(true);
        } else {
          setNewSongName('');
          handlePopupOpen();
          update(selectedCategory);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Popup
              handlePopupClose={handlePopupClose}
              message="Song Successfully Added"
              severity={severityEnum.SUCCESS}
              visible={visible}
            />
            <h2 id="transition-modal-title">Add Song</h2>
            <p id="transition-modal-description">
              Enter song name and select category from the dropdown.
            </p>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                // Toggle error prop if song alrady exists
                error={returnedError}
                helperText={returnedError ? 'Song Already Exists' : null}
                id="outlined-basic"
                label="New Song Name"
                onChange={handleSongNameChange}
                value={newSongName}
                variant="outlined"
              />
              <TextField
                id="category-select"
                onChange={handleCategorySelect}
                helperText="Select Category"
                select
                value={selectedCategory}
              >
                {categories?.map((category) => (
                  <MenuItem key={category.length} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <div id="button-flex-container">
                <Button
                  className="modal-close-button"
                  onClick={handleClose}
                  variant="contained"
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  disabled={!(newSongName && selectedCategory) || loading}
                  onClick={handleSubmit}
                  variant="contained"
                >
                  {loading ? (
                    <ReactLoading
                      height="1rem"
                      width="1rem"
                      type="spin"
                      color="#3f51b5"
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
