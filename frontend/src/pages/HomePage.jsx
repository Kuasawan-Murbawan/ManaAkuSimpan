import React from "react";
import { Container, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container
      maxW={"container.xl"}
      py={12}
      display={"flex"}
      justifyContent={"center"}
    >
      <HStack spacing={10}>
        <Link to="/storage">
          <Button>View All Storages</Button>
        </Link>
        <Link to="/search">
          <Button>Search Item</Button>
        </Link>
      </HStack>
    </Container>
  );
};

export default HomePage;
