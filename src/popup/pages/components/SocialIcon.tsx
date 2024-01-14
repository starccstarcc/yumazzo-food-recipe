import { Box, Center } from "@chakra-ui/react";

type SocialIconProps = {
  name: string;
};

function SocialIcon({ name }: SocialIconProps) {
  return (
    <Center
      w="24px"
      h="24px"
      bg="black.35"
      rounded="full"
      _hover={{ background: "gray.10" }}
      cursor="pointer"
    >
      <Box w="10px" h="10px" backgroundImage={`/icons/${name}.svg`} />
    </Center>
  );
}

export default SocialIcon;
