import { create } from "zustand";

export const useItemStore = create((set, get) => ({
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
  updateItem: async (iid, updatedItem, currentStorageId) => {
    if (!updatedItem.name || !updatedItem._id) {
      return { success: false, message: "please include name" };
    }

    const res = await fetch(`/api/item/${iid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const responseData = await res.json();

    if (!responseData.success)
      return { success: false, message: responseData.message };

    set((state) => ({
      items: state.items
        // update the item in the list
        .map((item) => (item._id === iid ? responseData.data : item))
        // filter out the item from the list (for moving item use case)
        .filter((item) => item.storageId === currentStorageId),
    }));

    return { success: true, message: responseData.message };
  },
  deleteItem: async (iid) => {
    const res = await fetch(`/api/item/${iid}`, {
      method: "DELETE",
    });

    const responseData = await res.json();

    if (!responseData.success)
      return { success: false, message: responseData.message };

    set((state) => ({
      items: state.items.filter((item) => item._id !== iid),
    }));
    return { success: true, message: responseData.message };
  },
  searchItem: async (keyword) => {
    const res = await fetch(`/api/item/search/${keyword}`);
    const responseData = await res.json();

    if (!responseData.success) return { success: false, message: responseData };

    set({ items: responseData.data || [] });
    return { success: true, message: "Item found" };
  },
}));
