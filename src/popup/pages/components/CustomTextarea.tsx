import { Input, Text, Textarea } from "@chakra-ui/react";

type CustomTextaraProps = {
  handleClick?: () => void;
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
};

const CustomTextarea = ({
  value,
  setValue,
  placeholder,
  handleClick,
}: CustomTextaraProps) => {
  return (
    <>
      <Textarea
        size="md"
        placeholder={placeholder}
        maxLength={200}
        px="11px"
        py="8px"
        fontSize="16px"
        background="black.30"
        boxShadow="0px 0px 0px 1px #5B6178"
        border="none"
        rounded="6px"
        mb="10px"
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
      <Text fontSize="14px" color="gray.30">
        {value.length}/200 Characters
      </Text>
    </>
  );
};

export default CustomTextarea;
