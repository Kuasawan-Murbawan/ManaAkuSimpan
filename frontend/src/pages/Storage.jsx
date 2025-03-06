import React from "react";

import { Container, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Storage = () => {
  return (
    <Container maxW={"fit-content"} mt={10}>
      <Link to="/createStorage">
        <Button>Create Storage</Button>
      </Link>
    </Container>
  );
};

export default Storage;
