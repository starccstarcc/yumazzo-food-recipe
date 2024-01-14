import React from "react";
import { Box } from "@chakra-ui/react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box w="362px" minH="582px" bg="black.10">
    {children}
  </Box>
);

export default Layout;
