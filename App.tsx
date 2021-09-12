import "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";

import { Navigation } from "./components/Navigation";
import { useCachedResources } from "./hooks/useCachedResources";
import { LoadingScreen } from "./screens/Loading.screen";
import { useDebugStore } from "./stores/debug";
import { theme } from "./theme";

export default function App() {
  const fontsLoaded = useCachedResources();
  const debugBorders = useDebugStore((state) => state.debugBorders);

  if (fontsLoaded) {
    return <LoadingScreen screen="app" />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={{ ...theme, debugBorders }}>
        <BottomSheetModalProvider>
          <Navigation />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
