import { create } from "zustand";

export const useItemStore = create((set) => ({
  items: [],
  setItem: (item) => set({ item }),
  fetchAllItems: async () => {
    const res = await fetch("/api/item");
    const responseData = res.json();

    set({ items: responseData.data || [] });
  },
  fetchItems: async (storageId) => {
    const res = await fetch(`/api/item/${storageId}`);
    const responseData = await res.json();

    set({ items: responseData.data || [] });
  },
  createItem: async (newItem) => {
    if (!newItem.name || !newItem.storageId) {
      return { success: false, message: "please include name" };
    }

    const res = await fetch(`/api/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const responseData = await res.json();

    set((state) => ({ items: [...state.items, responseData.data] }));

    return { success: true, message: "Item created" };
  },
}));
