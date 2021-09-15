import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React from "react";

export const DefaultBottomSheetBackdrop = (
  props: BottomSheetDefaultBackdropProps
) => {
  return (
    <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />
  );
};
