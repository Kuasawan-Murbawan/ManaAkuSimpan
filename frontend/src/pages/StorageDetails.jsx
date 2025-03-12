import React, { useEffect } from "react";

import { useItemStore } from "../store/item";
import { useStorageStore } from "../store/storage";
import { useParams } from "react-router-dom";
import {
  Text,
  HStack,
  VStack,
  SimpleGrid,
  Box,
  Image,
  GridItem,
  Button,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

const StorageDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchItems, items } = useItemStore();
  const { storageId } = useParams();

  const { storages } = useStorageStore();

  // get current storage's details
  const storage = storages.find((storage) => storage._id === storageId);

  useEffect(() => {
    fetchItems(storageId);
  }, [fetchItems]);

  if (!items || !storage) return <p>Items loading..</p>;

  return (
    <VStack maxH={"100vh"} overflow={"hidden"}>
      <HStack w={"full"} justifyContent="space-between">
        <Text fontSize={50} fontWeight="bold" ml={20}>
          {storage.name}
        </Text>
        <HStack mr={20}>
          <IoLocationOutline fontSize={45} />
          <Text fontSize={45}>{storage.location}</Text>
        </HStack>
      </HStack>
      <Text fontSize={30} w={"full"} alignItems={"Start"} ml={40}>
        {storage.description}
      </Text>

      <Box overflowY={"auto"} w={"90%"} h={"400px"} mt={5}>
        <SimpleGrid
          columns={{
            base: 4,
            md: 4,
            lg: 4,
          }}
          w={"full"}
          spacingY={4}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <Box key={item._id} p={3}>
                <VStack>
                  <Image
                    src={item.image}
                    alt={item.name}
                    h={48}
                    w={48}
                    objectFit={"cover"}
                    borderRadius={"md"}
                  />
                  <Text>{item.name}</Text>
                </VStack>
              </Box>
            ))
          ) : (
            <GridItem
              colSpan={{ base: 1, sm: 2, md: 3 }}
              w={"full"}
              alignItems={"center"}
            >
              <Text>No items found.</Text>
            </GridItem>
          )}
        </SimpleGrid>
      </Box>

      <Box h={1} w={"85%"} bg={"blackAlpha.400"} my={3}></Box>
      <HStack w={"75%"} justifyContent={"space-between"}>
        <Button w={"250px"} bg={"#283715"} color={"white"}>
          Add New Item
        </Button>
        <Button w={"350px"}>Search</Button>
        <Button w={"250px"} bg={"#e54e4e"} color={"white"}>
          Clear All Item
        </Button>
      </HStack>
    </VStack>
  );
};

export default StorageDetails;
