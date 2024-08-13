import { useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [openedEnvelopes, setOpenedEnvelopes] = useState([]);

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
        gTim: [timer, setTimer],
        gOpe: [openedEnvelopes, setOpenedEnvelopes],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
