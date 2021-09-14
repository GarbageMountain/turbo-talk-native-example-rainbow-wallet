import { styled, css } from "../theme";
import { Layout } from "./Layout.component";

export type CircleProps = { circleSize: number; shadow?: boolean };

export const baseCircleStyle = css<CircleProps>`
  border-radius: ${({ circleSize }) => circleSize / 2}px;
  width: ${({ circleSize }) => circleSize}px;
  height: ${({ circleSize }) => circleSize}px;
  ${({ shadow }) => (shadow ? `` : `overflow: hidden;`)}
`;

export const Circle = styled(Layout.Column)<CircleProps>`
  ${baseCircleStyle}
`;
