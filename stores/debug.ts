import create from "zustand";
import { combine } from "zustand/middleware";

export const useDebugStore = create(
  combine(
    {
      debugBorders: false,
    },
    (set) => ({
      toggleDebugger: () =>
        set((state) => ({ debugBorders: !state.debugBorders })),
    })
  )
);
