import React, { useState } from "react";
import {
  Box,
  VStack,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  HStack,
  Button,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useItemStore } from "../../store/item";
import { useNavigate } from "react-router-dom";
import { useStorageStore } from "../../store/storage";
import ConfirmDeleteAlertDialog from "./ConfirmDeleteAlertDialog";

const ItemCard = ({ item, Currentstorage }) => {
  const navigate = useNavigate();
  const toast = useToast();
  // Display Item Details
  const {
    isOpen: isItemDetailOpen,
    onOpen: onItemDetailOpen,
    onClose: onItemDetailClose,
  } = useDisclosure();

  // Update Item
  const { updateItem, deleteItem } = useItemStore();
  const [updatedItem, setUpdatedItem] = useState(item);
  const {
    isOpen: isUpdateItemOpen,
    onOpen: onUpdateItemOpen,
    onClose: onUpdateItemClose,
  } = useDisclosure();

  const handleUpdateItem = async (itemId, updatedItem) => {
    const { success, message } = await updateItem(
      itemId,
      updatedItem,
      Currentstorage._id
    );

    onUpdateItemClose();

    let title = success ? "Item Updated" : "Error";
    let status = success ? "success" : "error";

    toast({
      title: title,
      description: message,
      status: status,
    });
  };

  // Delete Item
  // Alert Dialog properties
  const {
    isOpen: confirmDeleteisOpen,
    onOpen: confirmDeleteOnOpen,
    onClose: confirmDeleteOnClose,
  } = useDisclosure();

  const handleDeleteItem = async (itemId) => {
    const { success, message } = await deleteItem(itemId);
    let title = success ? "Item Deleted" : "Error";
    let status = success ? "success" : "error";

    toast({
      title: title,
      description: message,
      status: status,
    });

    if (success) {
      onItemDetailClose();
    }
  };

  // Fetch all Storage
  const { storages } = useStorageStore();

  return (
    <Box key={item._id} p={3}>
      <VStack onClick={onItemDetailOpen} cursor={"pointer"}>
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

      <Modal
        onClose={onItemDetailClose}
        size={"full"}
        isOpen={isItemDetailOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pt={10} px={20}>
            <HStack spacing={10} justifyContent={"space-between"}>
              <HStack
                onClick={onItemDetailClose}
                _hover={{ textDecoration: "underline" }}
                cursor={"pointer"}
              >
                <FaArrowLeft fontSize={40} />
                <Text fontSize={40}>{Currentstorage.name}</Text>
              </HStack>
              <HStack spacing={5}>
                <Button onClick={onUpdateItemOpen}>Update</Button>
                <Button
                  bg={"Red"}
                  color={"white"}
                  onClick={confirmDeleteOnOpen}
                >
                  Delete
                </Button>
              </HStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"full"} h={"full"} pl={20}>
              <HStack>
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize={"600px"}
                  objectFit={"cover"}
                  borderRadius={"md"}
                />
                <VStack ml={50} spacing={10}>
                  <Text fontSize={"70"} fontWeight={"bold"}>
                    {item.name}
                  </Text>
                  <Text fontSize={"40"}>{item.keywords}</Text>
                </VStack>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal onClose={onUpdateItemClose} isOpen={isUpdateItemOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={10} m={2}>
              <Input
                placeholder="Item Name"
                name="name"
                value={updatedItem.name}
                onChange={(e) =>
                  setUpdatedItem({
                    ...updatedItem,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Keywords"
                name="keywords"
                value={updatedItem.keywords}
                onChange={(e) =>
                  setUpdatedItem({
                    ...updatedItem,
                    keywords: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image"
                name="image"
                value={updatedItem.image}
                onChange={(e) =>
                  setUpdatedItem({
                    ...updatedItem,
                    image: e.target.value,
                  })
                }
              />
              <Select
                name="location"
                value={updatedItem.storageId}
                onChange={(e) => {
                  setUpdatedItem({
                    ...updatedItem,
                    storageId: e.target.value,
                  });
                }}
              >
                {storages.map((storage) => (
                  <option key={storage._id} value={storage._id}>
                    {storage.name}
                  </option>
                ))}
              </Select>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={4}
              onClick={() => handleUpdateItem(item._id, updatedItem)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onUpdateItemClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ConfirmDeleteAlertDialog
        isOpen={confirmDeleteisOpen}
        onClose={confirmDeleteOnClose}
        onConfirm={() => handleDeleteItem(item._id)}
        cancelRef={React.useRef()}
        title={"Confirm Delete"}
        subject={"Item"}
      />
    </Box>
  );
};

export default ItemCard;
