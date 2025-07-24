import { create } from "zustand";

const useUIStore = create((set) => ({
  isDarkMode: false,
  filter: "all",
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setFilter: (filter) => set({ filter }),
}));

export default useUIStore;
