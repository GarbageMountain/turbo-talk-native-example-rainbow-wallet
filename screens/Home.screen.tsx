import React from "react";
import { Image, LayoutAnimation, LayoutRectangle } from "react-native";
import { Gesture } from "../components/GestureHandler.component";

import { Layout } from "../components/Layout.component";
import { Circle } from "../components/Shapes.component";
import { Spacer } from "../components/Spacer.component";
import { Display } from "../components/Typography.component";
import { useNFT } from "../hooks/useNFT";
import { neverInProd } from "../lib/neverInProd";
import { useTheme } from "../theme";

const NFTS: React.FC<{ title: string; projectUri: string; project: [] }> = (
  props
) => {
  const { project, title, projectUri } = props;
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  return (
    <>
      <Layout.PressableRow
        py="s-10"
        px="s-10"
        align
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setShow(!show);
        }}
      >
        <Circle circleSize={theme.sizes["xl-28"]}>
          <Image
            source={{
              uri: projectUri,
            }}
            style={{
              height: theme.sizes["xl-28"],
              width: theme.sizes["xl-28"],
            }}
          />
        </Circle>
        <Spacer.Horizontal size="s-10" />

        <Display>{title}</Display>
        <Spacer.Flex />
        <Display>{project.length}</Display>
      </Layout.PressableRow>
      <Layout.Row>
        {show
          ? project.map((nft: unknown, idx: number) => {
              return (
                <Layout.Row px key={idx}>
                  <Image
                    source={{
                      // @ts-expect-error
                      uri: nft.image_url,
                    }}
                    style={{ height: 100, width: 100, borderRadius: 20 }}
                  />
                  <Spacer.Horizontal />
                </Layout.Row>
              );
            })
          : null}
      </Layout.Row>
    </>
  );
};

export const HomeScreen: React.FC = () => {
  const { loading, tokens } = useNFT(
    "0x038Fe37C30A1B122382cA8De2F0eC9A4295984B1"
  );
  const projects = Object.keys(tokens ?? {});
  const [container, setContainer] = React.useState<null | LayoutRectangle>(
    null
  );

  return (
    <Layout.ScreenContainer bg="white" grow>
      <Layout.Column
        grow
        onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
      >
        <Display px color="grey" size="xl-28">
          Collectables
        </Display>
        {container && (
          <Gesture width={container.width} height={container.height} />
        )}
        {loading ? (
          <Display>Loading</Display>
        ) : tokens ? (
          <Layout.Scroll>
            {projects.map((project) => {
              return (
                <Layout.Column key={project}>
                  <NFTS
                    projectUri={tokens[project][0].asset_contract.image_url}
                    title={project}
                    project={tokens[project]}
                  />
                </Layout.Column>
              );
            })}
          </Layout.Scroll>
        ) : null}
      </Layout.Column>
    </Layout.ScreenContainer>
  );
};
