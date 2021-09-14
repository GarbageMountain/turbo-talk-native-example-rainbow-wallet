import { Ionicons, Entypo } from "@expo/vector-icons";
import React from "react";
import { PixelRatio, ViewProps } from "react-native";

import { styled, Color } from "../theme";

export const IonIcon = styled(Ionicons).attrs(({ size }) => ({
  size: (size ?? 1) * PixelRatio.getFontScale(),
}))<{
  iconColor?: Color;
}>`
  ${({ theme, iconColor, color }) =>
    color ? (color as string) : `color: ${theme.colors[iconColor ?? "text"]};`}
` as React.FC<
  {
    name: IonIconName;
    size: number;
    iconColor?: Color;
    color?: string;
  } & ViewProps
>;
export type IonIconName = keyof typeof Ionicons["glyphMap"];

export const EntypoIcon = styled(Entypo).attrs(({ size }) => ({
  size: (size ?? 1) * PixelRatio.getFontScale(),
}))<{
  iconColor?: Color;
}>`
  ${({ theme, iconColor, color }) =>
    color ? (color as string) : `color: ${theme.colors[iconColor ?? "text"]};`}
` as React.FC<
  {
    name: EntypoName;
    size: number;
    iconColor?: Color;
    color?: string;
  } & ViewProps
>;
export type EntypoName = keyof typeof Entypo["glyphMap"];
