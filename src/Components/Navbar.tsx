import React from "react";

//chakra ui
import { Flex, useColorMode, IconButton } from "@chakra-ui/core";

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex ml='10px' top='0' w='100%' zIndex={999} bg={colorMode === "light" ? "white" : "gray.800"} pos='fixed'>
        <IconButton
          variant="outline"
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? "moon" : "sun"}
          onClick={toggleColorMode}
        />
      </Flex>
    </>
  );
};

export default Navbar;