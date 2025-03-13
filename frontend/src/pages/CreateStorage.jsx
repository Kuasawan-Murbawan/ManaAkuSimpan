import React from "react";
import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Box,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useStorageStore } from "../store/storage";

const CreateStorage = () => {
  const [newStorage, setNewStorage] = useState({
    name: "",
    description: "",
    location: "",
    image: "",
  });

  const toast = useToast();
  const { createStorage } = useStorageStore();

  const handleAddStorage = async () => {
    const { success, message } = await createStorage(newStorage);

    let title = success ? "Storage Created" : "Error";
    let status = success ? "success" : "error";

    toast({
      title: title,
      description: message,
      status: status,
    });

    setNewStorage({ name: "", location: "", description: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} my={8}>
          Create New Storage
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("#a3b092", "#a3b092")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={5}>
            <Box h={"full"} w={"full"}>
              <Text mb="8px">Name: </Text>
              <Input
                size="sm"
                name="name"
                placeholder="Storage 1"
                value={newStorage.name}
                onChange={(e) =>
                  setNewStorage({ ...newStorage, name: e.target.value })
                }
              ></Input>
            </Box>
            <Box h={"full"} w={"full"}>
              <Text mb="8px">Location: </Text>
              <Input
                size="sm"
                name="location"
                placeholder="Balkoni row 2"
                value={newStorage.location}
                onChange={(e) =>
                  setNewStorage({ ...newStorage, location: e.target.value })
                }
              ></Input>
            </Box>
            <Box h={"full"} w={"full"}>
              <Text mb="8px">Description: </Text>
              <Input
                size="sm"
                name="description"
                placeholder="Barang camping"
                value={newStorage.description}
                onChange={(e) =>
                  setNewStorage({ ...newStorage, description: e.target.value })
                }
              ></Input>
            </Box>
            <Button rounded={3} onClick={handleAddStorage}>
              Create
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateStorage;
