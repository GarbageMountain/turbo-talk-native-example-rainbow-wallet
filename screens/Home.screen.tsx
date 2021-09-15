import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Dictionary } from "lodash";
import React from "react";
import {
  Image,
  LayoutAnimation,
  LayoutRectangle,
  Dimensions,
} from "react-native";

import { DefaultBottomSheetBackdrop } from "../components/DefaultBottomSheetBackdrop.component";
import { Gesture } from "../components/GestureHandler.component";
import { EntypoIcon } from "../components/Icon";
import { Layout } from "../components/Layout.component";
import { Circle } from "../components/Shapes.component";
import { Spacer } from "../components/Spacer.component";
import { Quicksand } from "../components/Typography.component";
import { useNFT } from "../hooks/useNFT";
import { useTokenStore } from "../stores/token.store";
import { useTheme } from "../theme";

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
        <Circle circleSize={theme.sizes["xl-28"]} shadow bg="white">
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
        </Circle>
        <Spacer.Horizontal size="s-10" />

        <Quicksand>{title}</Quicksand>
        <Spacer.Flex />
        <Quicksand>{project.length}</Quicksand>
        <EntypoIcon name="chevron-small-right" size={24} />
      </Layout.PressableRow>
      {show ? (
        <Layout.Row>
          {project.map((nft: Dictionary<any>, idx: number) => {
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
          })}
        </Layout.Row>
      ) : null}
    </>
  );
};
const { width } = Dimensions.get("screen");

export const HomeScreen: React.FC = () => {
  const { setTokens, tokens } = useTokenStore();
  const { tokens: fetchedTokens } = useNFT(
    "0x038Fe37C30A1B122382cA8De2F0eC9A4295984B1"
  );
  React.useEffect(() => {
    if (fetchedTokens) {
      setTokens(fetchedTokens);
    }
  }, [fetchedTokens]);

  const projects = Object.keys(tokens ?? {});
  const [selectedNFT, setSelectedNFT] = React.useState<Dictionary<any>>({});

  console.log(width);
  const [container, setContainer] = React.useState<null | LayoutRectangle>(
    null
  );
  // ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ["70%"], []);

  // callbacks
  const handlePresentModalPress = React.useCallback((nft: Dictionary<any>) => {
    setSelectedNFT(nft);
    bottomSheetModalRef.current?.present();
  }, []);
  // const handleSheetChanges = React.useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  return (
    <Layout.ScreenContainer bg="white" grow>
      <Layout.Column
        grow
        onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
      >
        <Quicksand px color="grey" size="xl-28">
          Collectables
        </Quicksand>
        {container && (
          <Gesture width={container.width} height={container.height} />
        )}
        {tokens ? (
          <Layout.Scroll>
            {projects.sort().map((project) => {
              return (
                <NFTS
                  key={project}
                  onPress={handlePresentModalPress}
                  projectUri={tokens[project][0].asset_contract.image_url}
                  title={project}
                  project={tokens[project]}
                />
              );
            })}
          </Layout.Scroll>
        ) : null}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          backdropComponent={DefaultBottomSheetBackdrop}
        >
          <Details selectedNFT={selectedNFT} />
        </BottomSheetModal>
      </Layout.Column>
    </Layout.ScreenContainer>
  );
};

const Details: React.FC<{ selectedNFT: any }> = (props) => {
  const { selectedNFT } = props;
  return (
    <>
      <Layout.Column px="s-10" center>
        <Layout.Row>
          <Quicksand weight="bold" size="l-24" py>
            {selectedNFT?.asset_contract?.name ?? ""}
          </Quicksand>
        </Layout.Row>
      </Layout.Column>
      <BottomSheetScrollView>
        <Image
          source={{ uri: selectedNFT.image_url }}
          style={{
            height: 250,
            width: width - 20,
            overflow: "hidden",
            borderRadius: 20,
            resizeMode: "contain",
          }}
        />
        <Quicksand size="s-10" color="grey" center py>
          {selectedNFT?.asset_contract?.description ?? ""}
        </Quicksand>
        <Layout.Row px py style={{ flexWrap: "wrap" }}>
          {selectedNFT?.traits?.map((trait: any, index: number) => {
            return (
              <React.Fragment key={`trait-${index}`}>
                <Layout.Column py={4}>
                  <Layout.Column
                    border={[1, "solid", "grey"]}
                    radius="m-18"
                    py={4}
                    px="s-10"
                    center
                    key={trait.value}
                  >
                    <Quicksand size="s-10">{trait?.value ?? ""}</Quicksand>
                  </Layout.Column>
                </Layout.Column>
                <Spacer.Horizontal />
              </React.Fragment>
            );
          }) ?? []}
        </Layout.Row>
      </BottomSheetScrollView>
    </>
  );
};
