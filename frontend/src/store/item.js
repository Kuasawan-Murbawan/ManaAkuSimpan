import { create } from "zustand";

export const useItemStore = create((set) => ({
  items: [],
  setItem: (item) => set({ item }),
  fetchItems: async (storageId) => {
    const res = await fetch(`/api/item/${storageId}`);
    const responseData = await res.json();

    console.log("from store: ", responseData.data);

    set({ items: responseData.data || [] });
  },
}));
