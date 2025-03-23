import React, { useEffect, useState } from "react";
import { VStack, Input, Button, Text } from "@chakra-ui/react";
import { useItemStore } from "../store/item";
const Search = () => {
  const { items, searchItem } = useItemStore();
  const [searchKeyword, setSearchKeyword] = useState("");

  const findItem = async () => {
    const { success, message } = await searchItem(searchKeyword);
  };

  // to see the items after search
  useEffect(() => {
    console.log("Items state updated:", items);
  }, [items]);

  return (
    <VStack spacing={5} mt={10}>
      <Text fontSize={"7xl"} fontWeight={"bold"}>
        Find Your Item
      </Text>
      <Input
        placeholder="khemah"
        w={"70%"}
        bg={"gray.300"}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button colorScheme="blue" onClick={() => findItem()}>
        Search
      </Button>
    </VStack>
  );
};

export default Search;
