import { ReactNode, createContext, useState } from 'react';
import { darktheme, lighttheme } from '../styles/theme';
import { DefaltTheme } from 'styled-components';

interface DarkmodeType {
  mode: boolean;
  setMode: () => void;
  theme: DefaltTheme;
}

export const DarkmodeContext = createContext<DarkmodeType>({
  mode: false,
  setMode: () => {},
  theme: darktheme,
});

interface DarkmodeProviderProps {
  children: ReactNode;
}

export const DarkmodeProvider: React.FC<DarkmodeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<boolean>(false);
  const onToggle = () => {
    const updatedmode = !mode;
    setMode(updatedmode);
  };
  const theme = mode ? darktheme : lighttheme;

  return (
    <DarkmodeContext.Provider value={{ mode: mode, setMode: onToggle, theme }}>
      {children}
    </DarkmodeContext.Provider>
  );
};
