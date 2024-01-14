import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Flex,
  Center,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../../type";
import { getDifficulty, getFlag } from "../../utils";
import { getRecipes } from "../../api";

function SearchPanel() {
  const [menuStatus, setMenuStatus] = useState(false);
  const { data: recipes } = getRecipes();
  const [searchKey, setSearchKey] = useState("");

  const filteredRecipes = useMemo(
    () =>
      recipes
        ? recipes.filter((recipe: Recipe) =>
            recipe.name.toLowerCase().includes(searchKey.toLowerCase())
          )
        : [],
    [recipes, searchKey]
  );

  return (
    <InputGroup position="relative" zIndex={1}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="white" />
      </InputLeftElement>
      <Input
        size="md"
        type="text"
        placeholder="Search cuisine"
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
        onClick={() => setMenuStatus(true)}
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      {menuStatus && (
        <>
          <Center position="absolute" w="full" top="51px">
            <Flex
              w="362px"
              maxH="236px"
              background="black.20"
              p="8px"
              rounded="6px"
              boxShadow="0px 10px 30px 3px rgba(0, 0, 0, 0.40)"
              flexDir="column"
              gap="5px"
              overflowY="auto"
            >
              {filteredRecipes.length ? (
                filteredRecipes.map((recipe: Recipe, index: number) => (
                  <Link
                    to={`/?index=${index}`}
                    onClick={() => setMenuStatus(false)}
                  >
                    <Center
                      key={index}
                      px="8px"
                      py="6px"
                      rounded="6px"
                      cursor="pointer"
                      _hover={{ background: "gray.10" }}
                    >
                      <Box h="24px" w="24px" fontSize="16px" mr="6px">
                        {getFlag(recipe.origin)}
                      </Box>
                      <Text fontWeight={500} mr="auto">
                        {recipe.name}
                      </Text>
                      {getDifficulty(recipe.difficulty)}
                      <Text
                        pl="10px"
                        fontSize="14px"
                        w="60px"
                        color="black.50"
                        borderLeft="1px solid"
                        borderLeftColor="black.50"
                      >
                        {recipe.produce + "min"}
                      </Text>
                    </Center>
                  </Link>
                ))
              ) : (
                <Text fontWeight={500} mr="auto">
                  No recipe found.
                </Text>
              )}
            </Flex>
          </Center>
          <Box
            position="absolute"
            top="-24px"
            left="-24px"
            w="100vw"
            h="100vh"
            background="transparent"
            zIndex={-1}
            onClick={() => setMenuStatus(false)}
          />
        </>
      )}
    </InputGroup>
  );
}

export default SearchPanel;
