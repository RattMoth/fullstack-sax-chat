import { useState } from 'react';

const usePopup = () => {
  const [visible, setVisible] = useState(false);

  const handlePopupOpen = () => {
    setVisible(true);
  };

  const handlePopupClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setVisible(false);
  };

  return { visible, setVisible, handlePopupOpen, handlePopupClose };
};

export default usePopup;
