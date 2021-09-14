import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { combine, persist } from "zustand/middleware";

export const useTokenStore = create(
  persist(
    combine(
      {
        tokens: null as any,
      },
      (set) => ({
        setTokens: (tokens: any) => set(() => ({ tokens })),
      })
    ),
    {
      name: "@tokens", // unique name
      getStorage: () => AsyncStorage,
    }
  )
);
