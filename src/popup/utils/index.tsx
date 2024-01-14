import { Center, Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import getCountryFlag from "country-flag-icons/unicode";

export const getDifficulty = (difficulty: number, type = "component") => {
  let difficultyString = "";
  switch (difficulty) {
    case 0:
      difficultyString = "Easy";
      break;
    case 1:
      difficultyString = "Medium";
      break;
    default:
      difficultyString = "Hard";
      break;
  }

  return type === "component" ? (
    <Center mr="10px" gap="10px">
      <Box
        w="12px"
        h="12px"
        backgroundImage={`/icons/${difficultyString.toLowerCase()}.svg`}
      ></Box>
      <Text fontSize="14px" fontWeight="bold">
        {difficultyString}
      </Text>
    </Center>
  ) : (
    difficultyString
  );
};

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export const getFlag = (country: string) =>
  getCountryFlag(country.length < 2 ? "ZZ" : country.toUpperCase());
