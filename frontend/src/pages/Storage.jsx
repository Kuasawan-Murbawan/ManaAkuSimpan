import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useStorageStore } from "../store/storage";
import StorageCard from "../components/ui/StorageCard";

const Storage = () => {
  const { fetchAllStorages, storages } = useStorageStore();

  useEffect(() => {
    fetchAllStorages();
  }, [fetchAllStorages]);

  if (!storages) return <p>Loading...</p>;

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack>
        <Text fontSize={40} fontWeight={"bold"} textAlign={"center"}>
          All Storages
        </Text>
        <Container maxW={"fit-content"} m={5}>
          <Link to="/createStorage">
            <Button>Create Storage</Button>
          </Link>
        </Container>

        <SimpleGrid
          columns={{
            base: 1,
            md: 1,
            lg: 2,
          }}
          spacing={10}
          w={"full"}
        >
          {storages.map((storage) => (
            <StorageCard key={storage._id} storage={storage} />
          ))}
        </SimpleGrid>

        {storages.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No storage found {}
            <Link to={"/createStorage"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
                display={"inline-flex"}
              >
                Create a storage {}
                {/* <FaArrowRight fontSize={30} /> */}
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Storage;
