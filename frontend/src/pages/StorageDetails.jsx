import React, { useEffect, useState } from "react";

import { useItemStore } from "../store/item";
import { useStorageStore } from "../store/storage";
import { useParams, useNavigate } from "react-router-dom";
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  useToast,
  ModalFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { IoLocationOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import ItemCard from "../components/ui/ItemCard";
import ConfirmDeleteAlertDialog from "../components/ui/ConfirmDeleteAlertDialog";

const StorageDetails = () => {
  const toast = useToast();

  // For Add New Item Modal
  const {
    isOpen: isAddItemOpen,
    onOpen: onAddItemOpen,
    onClose: onAddItemClose,
  } = useDisclosure();

  // For Edit Storage Modal
  const {
    isOpen: isUpdateStorageOpen,
    onOpen: onUpdateStorageOpen,
    onClose: onUpdateStorageClose,
  } = useDisclosure();

  const { fetchItems, createItem, items } = useItemStore();
  const { storages, deleteStorage, updateStorage, fetchAllStorages } =
    useStorageStore();
  const { storageId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStorages();
  }, [fetchAllStorages]);

  // get current storage's details
  const currentStorage = storages.find((storage) => storage._id === storageId);

  useEffect(() => {
    fetchItems(storageId);
  }, [fetchItems]);

  const [newItem, setNewItem] = useState({
    name: "",
    storageId: storageId,
    image: "",
    keywords: "",
  });

  // Add Item
  const handleAddItem = async () => {
    const { success, message } = await createItem(newItem);

    let title = success ? "Storage Created" : "Error";
    let status = success ? "success" : "error";

    onAddItemClose();

    toast({
      title: title,
      description: message,
      status: status,
    });

    setNewItem({ name: "", storageId: storageId, image: "", keywords: "" });
  };

  // Delete Storage
  const {
    isOpen: confirmDeleteisOpen,
    onOpen: confirmDeleteOnOpen,
    onClose: confirmDeleteOnClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDeleteStorage = async (sid) => {
    const { success, message } = await deleteStorage(sid);

    let title = success ? "Storage Deleted" : "Error";
    let status = success ? "success" : "error";

    toast({
      title: title,
      description: message,
      status: status,
    });

    if (success) {
      navigate("/storage");
    }
  };

  // Update Storage
  const [updatedStorage, setUpdatedStorage] = useState(currentStorage); // initial value in edit storage is the current value

  const handleUpdateStorage = async (sid, updatedStorage) => {
    const { success, message } = await updateStorage(sid, updatedStorage);

    // close modal after update storage
    onUpdateStorageClose();

    let title = success ? "Storage Updated" : "Error";
    let status = success ? "success" : "error";

    toast({
      title: title,
      description: message,
      status: status,
    });
  };

  if (!items || !currentStorage) return <p>Items loading..</p>;

  return (
    <VStack maxH={"100vh"} overflow={"hidden"}>
      <HStack w={"full"} justifyContent="space-between">
        <Text fontSize={50} fontWeight="bold" ml={20}>
          {currentStorage.name}
        </Text>
        <HStack mr={20}>
          <IoLocationOutline fontSize={45} />
          <Text fontSize={45}>{currentStorage.location}</Text>
        </HStack>
      </HStack>
      <Text fontSize={30} w={"full"} alignItems={"Start"} ml={40}>
        {currentStorage.description}
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
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              Currentstorage={currentStorage}
            />
          ))}
        </SimpleGrid>

        {items.length === 0 && (
          <GridItem
            colSpan={{ base: 1, sm: 2, md: 3 }}
            w={"full"}
            alignItems={"center"}
          >
            <Text>No items found.</Text>
          </GridItem>
        )}
      </Box>

      <Box h={1} w={"85%"} bg={"blackAlpha.400"} my={3}></Box>
      <HStack w={"75%"} justifyContent={"space-between"}>
        <Button
          w={"250px"}
          bg={"#283715"}
          color={"white"}
          onClick={onAddItemOpen}
        >
          Add New Item
        </Button>
        <Button w={"350px"}>Search</Button>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaAngleDown />}
            w={"250px"}
            color={"black"}
          >
            Settings
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onUpdateStorageOpen}>Edit Storage</MenuItem>
            <MenuItem>Clear all items</MenuItem>
            <MenuItem
              bg={"#e54e4e"}
              color={"white"}
              onClick={confirmDeleteOnOpen}
            >
              Delete Storage
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <Modal isOpen={isAddItemOpen} onClose={onAddItemClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} mb={5} alignItems={"start"}>
              <Box w={"full"}>
                <Text>Name</Text>
                <Input
                  placeholder={"Item Name"}
                  name="name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      name: e.target.value,
                    })
                  }
                ></Input>
              </Box>
              <Box w={"full"}>
                <Text>Keywords</Text>
                <Input
                  placeholder={"keywords, synonyms"}
                  name="keywords"
                  value={newItem.keywords}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      keywords: e.target.value,
                    })
                  }
                ></Input>
              </Box>
              <Box w={"full"}>
                <Text>Image</Text>
                <Input
                  placeholder={"Item Image"}
                  name="image"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      image: e.target.value,
                    })
                  }
                ></Input>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={4} onClick={() => handleAddItem()}>
              Submit
            </Button>
            <Button variant={"ghost"} onClick={onAddItemClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUpdateStorageOpen} onClose={onUpdateStorageClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Storage</ModalHeader>
          <ModalCloseButton />
          {updatedStorage && (
            <ModalBody>
              <VStack spacing={10} m={10}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedStorage.name}
                  onChange={(e) =>
                    setUpdatedStorage({
                      ...updatedStorage,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Location"
                  name="location"
                  value={updatedStorage.location}
                  onChange={(e) =>
                    setUpdatedStorage({
                      ...updatedStorage,
                      location: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Description"
                  name="description"
                  value={updatedStorage.description}
                  onChange={(e) =>
                    setUpdatedStorage({
                      ...updatedStorage,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image"
                  name="image"
                  value={updatedStorage.image}
                  onChange={(e) =>
                    setUpdatedStorage({
                      ...updatedStorage,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </ModalBody>
          )}

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={4}
              onClick={() =>
                handleUpdateStorage(currentStorage._id, updatedStorage)
              }
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onUpdateStorageClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ConfirmDeleteAlertDialog
        isOpen={confirmDeleteisOpen}
        onClose={confirmDeleteOnClose}
        onConfirm={() => handleDeleteStorage(currentStorage._id)}
        cancelRef={cancelRef}
        title={"Confirm Delete"}
        subject={"Storage"}
      />
    </VStack>
  );
};

export default StorageDetails;
