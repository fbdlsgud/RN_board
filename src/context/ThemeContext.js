import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../constants/theme";


const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? darkTheme : lightTheme;


    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );

}

export const useTheme = () => useContext(ThemeContext);