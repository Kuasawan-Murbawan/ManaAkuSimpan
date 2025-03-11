import React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Image,
  useDisclosure,
  useToast,
  ModalOverlay,
  Input,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useStorageStore } from "../../store/storage";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";

const StorageCard = ({ storage }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteStorage, updateStorage } = useStorageStore();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedStorage, setUpdatedStorage] = useState(storage); // initial value in edit storage is the current value

  const handleDeleteStorage = async (sid) => {
    const { success, message } = await deleteStorage(sid);

    let title = success ? "Storage Deleted" : "Error";
    let status = success ? "success" : "error";

    toast({
      title: title,
      description: message,
      status: status,
    });
  };

  const handleUpdateStorage = async (sid, updatedStorage) => {
    const { success, message } = await updateStorage(sid, updatedStorage);

    onClose();

    let title = success ? "Storage Updated" : "Error";
    let status = success ? "success" : "error";

    toast({
      title: title,
      description: message,
      status: status,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-10px)", shadow: "xl" }}
      bg={bg}
      p={5}
    >
      <HStack spacing={5}>
        <Image
          src={storage.image}
          alt={storage.name}
          h={48}
          w={48}
          objectFit={"cover"}
        />
        <VStack spacing={8} align={"start"}>
          <Text fontSize={"2xl"} fontWeight={"bold"} textColor={textColor}>
            {storage.name}
          </Text>
          <Text fontSize={"xl"} textColor={textColor}>
            {storage.location}
          </Text>
          <Text textColor={textColor}>{storage.description} </Text>
        </VStack>

        <HStack spacing={2}>
          <Box
            bg={"red"}
            cursor={"pointer"}
            borderRadius={"sm"}
            w={30}
            h={30}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => handleDeleteStorage(storage._id)}
          >
            <MdDelete color="white" size={24} />
          </Box>
          <Box
            bg={"grey"}
            cursor={"pointer"}
            borderRadius={"sm"}
            w={30}
            h={30}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onOpen}
          >
            <MdModeEdit color="white" size={24} />
          </Box>
        </HStack>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Storage Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={10} m={10}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedStorage.name}
                onChange={(e) =>
                  setUpdatedStorage({ ...updatedStorage, name: e.target.value })
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
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={4}
              onClick={() => handleUpdateStorage(storage._id, updatedStorage)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StorageCard;
