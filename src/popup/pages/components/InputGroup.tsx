import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type InputGroupProps = {
  label: string;
  children: React.ReactNode;
  errorMessage?: string;
};

function InputGroup({ label, children, errorMessage }: InputGroupProps) {
  return (
    <Box flex={1} position="relative">
      <Text fontSize="16px" fontWeight={500} color="white" mb="10px">
        {label}
      </Text>
      {children}
      {errorMessage && (
        <Text
          as="span"
          fontSize="12px"
          color="red"
          position="absolute"
          bottom="-20px"
        >
          {errorMessage}
        </Text>
      )}
    </Box>
  );
}

export default InputGroup;
