import { create } from "zustand";

export const useStorageStore = create((set) => ({
  storages: [],
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

    // set the current storages to be the storages in the server
    set((state) => ({ storages: [...state.storage, responseData.data] }));

    return { success: true, message: "Storage created!" }; // success: responseData.success
  },
  fetchStorage: async (storageId) => {
    // TODO: i dont think we need this
  },
  fetchAllStorages: async () => {
    // default method is GET so no need to specify
    const res = await fetch("/api/storage");
    const responseData = await res.json();

    set({ storages: responseData.data || [] });
  },
  deleteStorage: async (storageID) => {
    // Send API to the backend
    const res = await fetch(`/api/storage/${storageID}`, {
      method: "DELETE",
    });

    // abort if error
    const responseData = await res.json();
    if (!responseData.success)
      return { success: false, message: responseData.message };

    // Update UI immediately
    set((state) => ({
      storages: state.storages.filter((storage) => storage._id !== storageID),
    }));

    return { success: true, message: responseData.message };
  },
  updateStorage: async (sid, updatedStorage) => {
    const res = await fetch(`/api/storage/${sid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStorage),
    });

    const responseData = await res.json();
    if (!responseData.success)
      return { success: false, message: responseData.message };

    // update the UI immmediately using the returned data from response
    // loop thru all storages, if the id matched, replace with the updated storage
    set((state) => ({
      storages: state.storages.map((storage) =>
        storage._id === sid ? responseData.data : storage
      ),
    }));

    return { success: true, message: responseData.message };
  },
}));
