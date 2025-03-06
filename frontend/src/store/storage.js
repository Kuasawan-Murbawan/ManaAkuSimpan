import { create } from "zustand";

export const useStorageStore = create((set) => ({
  storage: [],
  setStorage: (storage) => set({ storage }),
  createStorage: async (newStorage) => {
    if (!newStorage.name) {
      return { success: false, message: "Please give it the name" };
    }
    const res = await fetch("/api/storage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStorage),
    });

    const responseData = await res.json();
    set((state) => ({ storages: [...state.storage, responseData.data] }));

    return { success: true, message: "Storage created!" };
  },
}));
