import React from "react";
import { useMemo, useState, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import HomeComponent from "./components/HomeComponent";
import MenuBarComponent from "./components/MenuBarComponent";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      {/* tslint:disable */}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "flex-start",
            justifyContent: "flex-start",
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: '100vh',
            // p: 2,
            m: 0,
          }}
        >
          <MenuBarComponent onThemeChange={setMode} />
          <HomeComponent />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
