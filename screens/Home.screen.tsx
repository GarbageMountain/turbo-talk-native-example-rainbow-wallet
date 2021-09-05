import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, LayoutAnimation } from "react-native";

import { Layout } from "../components/Layout.component";
import { Circle } from "../components/Shapes.component";
import { Spacer } from "../components/Spacer.component";
import { Display } from "../components/Typography.component";
import { useNFT } from "../hooks/useNFT";
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
                <React.Fragment key={idx}>
                  <Image
                    source={{
                      // @ts-expect-error
                      uri: nft.image_url,
                    }}
                    style={{ height: 100, width: 100, borderRadius: 20 }}
                  />
                  <Spacer.Horizontal />
                </React.Fragment>
              );
            })
          : null}
      </Layout.Row>
    </>
  );
};

export const HomeScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { loading, tokens } = useNFT(
    "0x038Fe37C30A1B122382cA8De2F0eC9A4295984B1"
  );
  const projects = Object.keys(tokens ?? {});

  return (
    <Layout.ScreenContainer bg="white" grow>
      <Layout.Row py justify align="flex-end">
        <Display color="grey" size="xl-28">
          Collectables
        </Display>
      </Layout.Row>

      {loading ? (
        <Display>Loading</Display>
      ) : tokens ? (
        <Layout.Scroll>
          {projects.map((project) => {
            return (
              <Layout.Column px="s-10">
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
      {/* @ts-expect-error */}
      <Layout.PressableRow center onPress={() => navigate("Settings")}>
        <Display>Click For Settings</Display>
      </Layout.PressableRow>
    </Layout.ScreenContainer>
  );
};
