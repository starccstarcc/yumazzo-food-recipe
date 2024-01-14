import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

type CustomInputProps = {
  handleClick?: () => void;
  value: string | number;
  placeholder?: string;
  type?: string;
  right?: string;
  setValue: (value: string) => void;
};

const CustomInput = ({
  value,
  setValue,
  handleClick,
  type = "text",
  right,
  placeholder,
}: CustomInputProps) => {
  return (
    <InputGroup position="relative">
      <Input
        size="md"
        type={type}
        placeholder={placeholder}
        px="11px"
        py="8px"
        fontSize="16px"
        background="black.30"
        boxShadow="0px 0px 0px 1px #5B6178"
        border="none"
        rounded="6px"
        _placeholder={{
          color: "gray.10",
        }}
        _focus={{
          boxShadow: "0px 0px 0px 1px #663CDD inset, 0px 0px 0px 4px #B89FFF",
          border: "none",
        }}
        onClick={() => handleClick}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {right && (
        <InputRightElement
          pointerEvents="none"
          pr="11px"
          fontSize="14px"
          color="gray.40"
          fontWeight={300}
        >
          {right}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default CustomInput;
