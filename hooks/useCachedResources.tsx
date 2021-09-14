import {
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_300Light,
} from "@expo-google-fonts/open-sans";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import {
  RobotoSlab_300Light,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from "@expo-google-fonts/roboto-slab";
import { useFonts } from "expo-font";

export function useCachedResources() {
  const [fontsLoading] = useFonts({
    RobotoSlab_300Light,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
    OpenSans_300Light,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  const fontLoaded = !fontsLoading;

  return fontLoaded;
}
