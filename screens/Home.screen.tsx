import React from "react";
import {
  Image,
  LayoutAnimation,
  LayoutRectangle,
  Dimensions,
} from "react-native";

import { Gesture } from "../components/GestureHandler.component";
import { Layout } from "../components/Layout.component";
import { Circle } from "../components/Shapes.component";
import { Spacer } from "../components/Spacer.component";
import { Display } from "../components/Typography.component";
import { useNFT } from "../hooks/useNFT";
import { useTheme } from "../theme";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Dictionary } from "lodash";

const NFTS: React.FC<{
  title: string;
  projectUri: string;
  project: [];
  onPress: (nft: Dictionary<any>) => void;
}> = (props) => {
  const { project, title, projectUri, onPress } = props;
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
          ? project.map((nft: Dictionary<any>, idx: number) => {
              return (
                <Layout.PressableRow onPress={() => onPress(nft)} px key={idx}>
                  <Image
                    source={{
                      uri: nft.image_url,
                    }}
                    style={{ height: 150, width: 150, borderRadius: 20 }}
                  />
                  <Spacer.Horizontal />
                </Layout.PressableRow>
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
  const [selectedNFT, setSelectedNFT] = React.useState<Dictionary<any>>({});
  const { width } = Dimensions.get("screen");
  const theme = useTheme();
  console.log(width);
  const [container, setContainer] = React.useState<null | LayoutRectangle>(
    null
  );
  // ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ["95%"], []);

  // callbacks
  const handlePresentModalPress = React.useCallback((nft: Dictionary<any>) => {
    setSelectedNFT(nft);
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
                    onPress={handlePresentModalPress}
                    projectUri={tokens[project][0].asset_contract.image_url}
                    title={project}
                    project={tokens[project]}
                  />
                </Layout.Column>
              );
            })}
          </Layout.Scroll>
        ) : null}

        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={snapPoints}>
          <Layout.ScreenContainer>
            <Layout.Column px="s-10" center>
              <Layout.Row>
                <Display weight="bold" size="l-24" py>
                  {selectedNFT?.asset_contract?.name ?? ""}
                </Display>
                <Spacer.Flex />
              </Layout.Row>
              <Image
                source={{ uri: selectedNFT.image_url }}
                style={{
                  height: 250,
                  width: width - theme.sizes["s-10"] * 2,
                  borderRadius: 20,
                  resizeMode: "contain",
                }}
              />
              <Display size="s-10" color="grey" center py>
                {selectedNFT?.asset_contract?.description ?? ""}
              </Display>
              <Layout.Row
                px
                py
                justify="space-between"
                style={{ flexWrap: "wrap" }}
              >
                {selectedNFT?.traits?.map((trait: unknown) => {
                  return (
                    <Layout.Column py="s-10">
                      <Layout.Column
                        border={[1, "solid", "grey"]}
                        radius="m-18"
                        py
                        px="s-10"
                        center
                        key={trait.value}
                      >
                        <Display size="s-10">{trait?.value ?? ""}</Display>
                      </Layout.Column>
                    </Layout.Column>
                  );
                }) ?? []}
              </Layout.Row>
            </Layout.Column>
          </Layout.ScreenContainer>
        </BottomSheetModal>
      </Layout.Column>
    </Layout.ScreenContainer>
  );
};
