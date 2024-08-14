import { useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [album, setAlbum] = useState([]);
  const [envelopes, setEnvelopes] = useState([1, 2, 3, 4]);
  const [openedEnvelopes, setOpenedEnvelopes] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId = null;
    if (timer > 0) {
      let seconds = timer;
      intervalId = setInterval(() => {
        seconds--;
        setTimer(seconds);
      }, 1000);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <GlobalContext.Provider
      value={{
        gAlb: [album, setAlbum],
        gEnv: [envelopes, setEnvelopes],
        gOpe: [openedEnvelopes, setOpenedEnvelopes],
        gTim: [timer, setTimer],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
