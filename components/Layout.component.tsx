import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  styled,
  baseLayout,
  baseColumnLayout,
  baseRowLayout,
  debug,
} from "../theme";

export const Layout = {
  Row: styled(View)`
    ${baseLayout}
    ${baseRowLayout}
    ${debug("red")}
  `,
  PressableRow: styled(Pressable)`
    ${baseLayout}
    ${baseRowLayout}
    ${debug("blue")}
  `,
  Column: styled(View)`
    ${baseLayout}
    ${baseColumnLayout}
    ${debug("green")}
  `,
  PressableColumn: styled(Pressable)`
    ${baseLayout}
    ${baseColumnLayout}
    ${debug("purple")}
  `,
  Scroll: styled(ScrollView)`
    ${baseLayout}
    ${baseColumnLayout}
    ${debug("yellow")}
  `,
  ScreenContainer: styled(SafeAreaView)`
    ${baseLayout}
    ${baseColumnLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) &&
      `border: solid ${StyleSheet.hairlineWidth}px purple;`}
  `,
};
