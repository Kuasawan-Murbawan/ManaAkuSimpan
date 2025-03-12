import React, { useEffect } from "react";

import { useItemStore } from "../store/item";
import { useStorageStore } from "../store/storage";
import { useParams } from "react-router-dom";

const StorageDetails = () => {
  const { fetchItems, items } = useItemStore();
  const { storageId } = useParams();

  useEffect(() => {
    fetchItems(storageId);
  }, [fetchItems]);

  console.log("response: ", items);

  if (!items) return <p>Items loading..</p>;

  return <div>Im here</div>;
};

export default StorageDetails;
