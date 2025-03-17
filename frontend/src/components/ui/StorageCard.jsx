import React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const StorageCard = ({ storage }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

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
