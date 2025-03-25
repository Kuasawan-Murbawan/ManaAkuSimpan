import {
  HStack,
  Image,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStorageStore } from "../../store/storage";

const SearchItemResult = ({ item }) => {
  const {
    isOpen: itemDetailsIsOpen,
    onOpen: itemDetailsOnOpen,
    onClose: itemDetailsOnClose,
  } = useDisclosure();

  const { storages, fetchStorage } = useStorageStore();

  const openItemDetails = async () => {
    getStorageDetails(item.storageId);
    itemDetailsOnOpen();
  };

  const getStorageDetails = async (storageId) => {
    await fetchStorage(storageId);
  };

  return (
    <Box>
      <HStack
        bg={"gray.100"}
        p={10}
        borderRadius={"2xl"}
        onClick={openItemDetails}
      >
        <Image
          src={item.image}
          alt={item.name}
          h={48}
          w={48}
          objectFit={"cover"}
          borderRadius={5}
        />
        <VStack ml={7}>
          <Text fontSize="4xl" fontWeight={"bold"} w={"full"}>
            {item.name}
          </Text>
          <Text fontSize={"2xl"} w={"full"}>
            {item.keywords}
          </Text>
        </VStack>
      </HStack>

      <Modal
        isOpen={itemDetailsIsOpen}
        onClose={itemDetailsOnClose}
        size={"2xl"}
        isCentered
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="5px"
        />
        <ModalContent>
          <ModalHeader>Continue Searching</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Image
                src={item.image}
                alt={item.name}
                h={48}
                w={48}
                objectFit={"cover"}
                borderRadius={5}
              />{" "}
              <VStack w={"full"} pl={7}>
                <Text fontSize="2xl" fontWeight={"bold"} w={"full"}>
                  {item.name}
                </Text>
                <Text fontSize={"lg"} w={"full"}>
                  {item.keywords}
                </Text>
                <Box h={1} w={"100%"} bg={"blackAlpha.300"} mt={3}></Box>
                <Box bg={"green.100"} p={8} w={"85%"} borderRadius={5} my={5}>
                  <HStack>
                    <VStack w={"full"} align={"start"}>
                      <Text fontSize={"xl"} fontWeight={"bold"}>
                        {storages.name}
                      </Text>
                      <Text>{storages.location}</Text>
                      <Link to={`/storage/${storages._id}`}>
                        <Text decoration={"underline"}>Go to storage</Text>
                      </Link>
                    </VStack>
                    <Image
                      src={storages.image}
                      alt={storages.name}
                      h={24}
                      w={24}
                      objectFit={"cover"}
                      borderRadius={5}
                    />
                  </HStack>
                </Box>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SearchItemResult;
