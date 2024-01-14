import { Box, Text } from "@chakra-ui/react";

type RecipeInfoProps = {
  label: string;
  content: string | number | undefined;
  className?: string;
};

function RecipeInfo({ label, content, className }: RecipeInfoProps) {
  return (
    <Box flex={1}>
      <Text fontSize="13px" color="gray.10">
        {label}
      </Text>
      <Text fontSize="16px" fontWeight={500} className={className}>
        {content}
      </Text>
    </Box>
  );
}

export default RecipeInfo;
