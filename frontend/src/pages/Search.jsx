import React, { useEffect, useState } from "react";
import { VStack, Input, Button, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { useItemStore } from "../store/item";
import SearchItemResult from "../components/ui/SearchItemResult";

const Search = () => {
  const { items, searchItem } = useItemStore();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showResult, setShowResult] = useState(false);
  // to avoid the showing result to follow the onchange
  const [searchTerm, setSearchTerm] = useState("");

  const findItem = async () => {
    const { success, message } = await searchItem(searchKeyword);
    setShowResult(true);
    setSearchTerm(searchKeyword);
  };

  // find item when user press "Enter" key
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      findItem();
    }
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
        onKeyDown={handleEnterKey}
      />
      <Button colorScheme="blue" onClick={() => findItem()}>
        Search
      </Button>

      <Box h={1} w={"85%"} bg={"blackAlpha.400"} my={3}></Box>

      {showResult && (
        <VStack w={"full"}>
          <Text w="85%" alignItems={"start"} fontSize={25}>
            Showing results for <b>{searchTerm}</b>
          </Text>
          <SimpleGrid columns={1} w={"85%"} p={50} spacingY={10}>
            {items.map((item) => (
              <SearchItemResult key={item._id} item={item} />
            ))}
          </SimpleGrid>
        </VStack>
      )}

      {items.length === 0 && showResult && <Text>No items found</Text>}
    </VStack>
  );
};

export default Search;
