import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/ui/NavBar";
import HomePage from "./pages/HomePage";
import Storage from "./pages/Storage";
import Search from "./pages/Search";
import About from "./pages/About";
import Account from "./pages/Account";
import StorageDetails from "./pages/StorageDetails";
import CreateStorage from "./pages/CreateStorage";
import { useColorModeValue } from "@chakra-ui/react";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("#e1e0e0", "gray.900")} pt={5}>
      {/* <NavBar /> */}
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/createStorage" element={<CreateStorage />} />
        <Route path="/storage/:storageId" element={<StorageDetails />} />
      </Routes>
    </Box>
  );
}

export default App;
