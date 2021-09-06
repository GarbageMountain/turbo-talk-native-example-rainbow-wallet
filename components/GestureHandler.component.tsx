import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

import { useDebugStore } from "../stores/debug";

type GestureProps = {
  width: number;
  height: number;
};

const styles = StyleSheet.create({
  container: { zIndex: 9999 },
});

export const Gesture: React.FC<GestureProps> = (props) => {
  const toggleDebugger = useDebugStore((state) => state.toggleDebugger);
  const { width, height } = props;
  const translateX = useSharedValue(width - 60);
  const translateY = useSharedValue(60);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, width - 60);
      translateY.value = clamp(
        ctx.offsetY + event.translationY,
        0,
        height - 60
      );
    },
    onEnd: (event) => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, width - 60],
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, height - 60],
      });
    },
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View {...{ style }}>
          <Pressable
            onPress={toggleDebugger}
            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
            style={{
              width: 60,
              height: 60,
              position: "absolute",
            }}
          >
            <Image
              style={{ width: 48, height: 48 }}
              source={require("../assets/mild_panic_cowboy.png")}
            />
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
