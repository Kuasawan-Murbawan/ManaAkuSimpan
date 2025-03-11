import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
import { useStorageStore } from "../store/storage";
import StorageCard from "../components/ui/StorageCard";

const HomePage = () => {
  const { fetchStorages, storages } = useStorageStore();

  useEffect(() => {
    fetchStorages();
  }, [fetchStorages]);

  console.log(storages);

  if (!storages) return <p>Loading...</p>;

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack>
        <Text fontSize={40} fontWeight={"bold"} textAlign={"center"} mb={5}>
          All Storages
        </Text>

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

export default HomePage;
