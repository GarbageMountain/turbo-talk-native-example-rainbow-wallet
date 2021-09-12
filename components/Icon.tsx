import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { PixelRatio, ViewProps } from "react-native";

import { styled, Color } from "../theme";

export const Icon = styled(Ionicons).attrs(({ size }) => ({
  size: (size ?? 1) * PixelRatio.getFontScale(),
}))<{
  iconColor?: Color;
}>`
  ${({ theme, iconColor, color }) =>
    color ? (color as string) : `color: ${theme.colors[iconColor ?? "text"]};`}
` as React.FC<
  {
    name: IconName;
    size: number;
    iconColor?: Color;
    color?: string;
  } & ViewProps
>;
export type IconName = keyof typeof Ionicons["glyphMap"];
