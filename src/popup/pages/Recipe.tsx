import { Box, Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { getRecipe } from "../api";
import SearchPanel from "./components/SearchPanel";
import { getDifficulty, getFlag, useQuery } from "../utils";
import { Recipe } from "../type";
import SocialIcon from "./components/SocialIcon";
import RecipeInfo from "./components/RecipeInfo";

function Recipe() {
  let query = useQuery();
  const { data: recipe, isValidating: loading } = getRecipe(
    parseInt(query.get("index") || "0")
  );
  const navigate = useNavigate();

  return (
    <Box p="24px">
      <SearchPanel />
      {loading ? (
        <Center h="calc(100vh - 88px)" w="full">
          <Spinner color="white" />
        </Center>
      ) : (
        <>
          <Center my="24px">
            <Box h="24px" w="24px" fontSize="16px" mr="10px">
              {getFlag(recipe?.origin || "")}
            </Box>
            <Text fontSize="14px" fontWeight={500} mr="auto">
              {recipe?.name}
            </Text>
            <Flex gap="5px" mr="5px">
              <SocialIcon name="Twitter" />
              <SocialIcon name="Telegram" />
              <SocialIcon name="Medium" />
            </Flex>
            <Button
              fontSize="13px"
              bg="black.35"
              p="7px"
              height="24px"
              rounded="4px"
              _hover={{ background: "gray.10" }}
              onClick={() => navigate("/add")}
            >
              + Add recipe
            </Button>
          </Center>
          <Box
            p="10px"
            background="black.30"
            rounded="6px"
            w="full"
            h="full"
            mb="24px"
          >
            <Box
              background={
                getDifficulty(recipe?.difficulty || 0, "string") === "Hard"
                  ? "purple.10"
                  : getDifficulty(recipe?.difficulty || 0, "string") === "Hard"
                  ? "green.10"
                  : "blue.10"
              }
              rounded="6px"
              px="20px"
              py="10px"
            >
              <Flex mb="15px" alignItems="center">
                <Box
                  w="27px"
                  h="27px"
                  backgroundImage="/icons/food.svg"
                  mr="10px"
                />
                <Text fontSize="18px" fontWeight="bold" color="black">
                  {"Difficulty: " +
                    getDifficulty(recipe?.difficulty || 0, "string")}
                </Text>
              </Flex>
              <Text color="black">{recipe?.description}</Text>
            </Box>
          </Box>
          <Box
            px="24px"
            py="13px"
            background="black.30"
            rounded="6px"
            w="full"
            h="full"
          >
            <Flex flexDir="column" gap="12px">
              <Flex gap="24px">
                <RecipeInfo
                  label="Protein"
                  content={recipe?.protein}
                  className="text-white"
                />
                <RecipeInfo
                  label="Spice Level"
                  content={recipe?.spice}
                  className="text-red-600"
                />
              </Flex>
              <Flex gap="24px">
                <RecipeInfo
                  label="Spices"
                  content={recipe?.spice}
                  className="text-gradient"
                />
                <RecipeInfo
                  label="Cooking Oil"
                  content={recipe?.cookingOil}
                  className="text-gradient"
                />
              </Flex>
              <Flex gap="24px">
                <RecipeInfo
                  label="Volume/Weight"
                  content={recipe?.volume + "g"}
                  className="text-white"
                />
                <RecipeInfo
                  label="Serves"
                  content={recipe?.serves}
                  className="text-white"
                />
              </Flex>
              <Flex gap="24px">
                <RecipeInfo
                  label="Authenticity"
                  content={recipe?.authenticity}
                  className="text-gradient"
                />
                <RecipeInfo
                  label="Stock"
                  content={recipe?.stock}
                  className="text-gradient"
                />
              </Flex>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Recipe;
