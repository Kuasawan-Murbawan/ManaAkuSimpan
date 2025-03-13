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
import { Link } from "react-router-dom";

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
    <Link to={`/storage/${storage._id}`}>
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
        </HStack>
      </Box>
    </Link>
  );
};

export default StorageCard;
