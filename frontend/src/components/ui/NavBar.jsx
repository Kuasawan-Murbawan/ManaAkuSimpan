import React from "react";
import {
  Container,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoMdPerson } from "react-icons/io";
import { MdModeNight } from "react-icons/md";
import { LuSun } from "react-icons/lu";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW={"1140px"}
      h={"full"}
      px={4}
      bg={useColorModeValue("#a3b092", "#a3b092")}
      rounded={"25px"}
      mt={3}
      w={"full"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={4} alignItems={"left"} ml={4}>
          <Text>
            <Link to={"/"}>Home</Link>
          </Text>

          <Text>
            <Link to={"/storage"}>Storages</Link>
          </Text>

          <Text>
            <Link to={"/search"}>Search</Link>
          </Text>

          <Text>
            <Link to={"/about"}>About</Link>
          </Text>
        </HStack>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/account"}>
            <Button>
              <IoMdPerson fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MdModeNight /> : <LuSun size={"20"} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
