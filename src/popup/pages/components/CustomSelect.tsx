import { Select } from "@chakra-ui/react";
type Option = {
  label: string;
  value: string;
};
type CustomInputProps = {
  options: Option[];
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
};

const CustomSelect = ({
  options,
  value,
  setValue,
  placeholder,
}: CustomInputProps) => {
  return (
    <Select
      size="md"
      placeholder={placeholder}
      fontSize="16px"
      background="black.30"
      boxShadow="0px 0px 0px 1px #5B6178"
      border="none"
      rounded="6px"
      color="white"
      iconColor="white"
      _focus={{
        boxShadow: "0px 0px 0px 1px #663CDD inset, 0px 0px 0px 4px #B89FFF",
        border: "none",
      }}
      value={value}
      onChange={(event) => {
        setValue(event?.target?.value);
      }}
    >
      {options.map((option, index) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default CustomSelect;
