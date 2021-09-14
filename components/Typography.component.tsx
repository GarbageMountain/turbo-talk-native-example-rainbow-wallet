import { StyleSheet, Text as RawText } from "react-native";

import { styled, baseTypography } from "../theme";

export const OpenSans = styled(RawText)`
  ${baseTypography}
  ${({ theme, weight }) =>
    `font-family: ${theme.fonts["open-sans"][weight ?? "regular"]}`}
  ${({ debug, theme: { debugBorders } }) =>
    (debugBorders || debug) &&
    `border: solid ${StyleSheet.hairlineWidth}px orange;`}
`;

//
export const RobotoSlab = styled(RawText)`
  ${baseTypography}
  ${({ theme, weight }) =>
    `font-family: ${theme.fonts["roboto-slab"][weight ?? "regular"]}`}
  ${({ debug, theme: { debugBorders } }) =>
    (debugBorders || debug) &&
    `border: solid ${StyleSheet.hairlineWidth}px orange;`}
`;

//
export const Quicksand = styled(RawText)`
  ${baseTypography}
  ${({ theme, weight }) =>
    `font-family: ${theme.fonts["quicksand"][weight ?? "bold"]}`}
  ${({ debug, theme: { debugBorders } }) =>
    (debugBorders || debug) &&
    `border: solid ${StyleSheet.hairlineWidth}px orange;`}
`;
