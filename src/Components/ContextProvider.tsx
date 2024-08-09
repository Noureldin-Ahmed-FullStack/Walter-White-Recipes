import { createContext,  useState } from 'react';
import { PaletteMode } from '@mui/material';

// Create a context

interface MyContextProps {
  // darkMode: boolean;
  // setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  Theme: PaletteMode;
  setTheme: React.Dispatch<React.SetStateAction<PaletteMode>>;
  ToggleTheme: () => void
}

export const MyContext = createContext<MyContextProps | null>(null);
interface props {
  children: React.ReactNode
}


export default function MyContextProvider(props: props) {

  const getInitialTheme = (): PaletteMode => {
    // Get the theme from local storage or default to 'light'
    const savedTheme = localStorage.getItem('BatteryStoreTheme');
    return (savedTheme as PaletteMode) || 'light';
  };
  const [Theme, setTheme] = useState<PaletteMode>(getInitialTheme);
  const ToggleTheme = () => {
    Theme == 'dark' ? setTheme('light') : setTheme('dark')
    if (Theme == 'dark') {
      setTheme('light')
      localStorage.setItem('BatteryStoreTheme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('BatteryStoreTheme', 'dark')
    }
  }


  // const [darkMode, setDarkmode] = useState(true);
  const contextValue = {
    Theme,
    setTheme,
    ToggleTheme,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
