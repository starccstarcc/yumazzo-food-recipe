import { useState } from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import CustomInput from "./components/CustomInput";
import CustomSelect from "./components/CustomSelect";
import { countries } from "country-flag-icons";
import getCountryFlag from "country-flag-icons/unicode";
import InputGroup from "./components/InputGroup";
import CustomTextarea from "./components/CustomTextarea";
import { getRecipeNumber, postData } from "../api";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const initValues = {
    name: "",
    origin: "",
    description: "",
    difficulty: "",
    protein: "",
    produce: "",
    spice: "",
    cookingOil: "",
    volume: "",
    serves: "",
    authenticity: "",
    stock: "",
  };
  const [recipeValues, setRecipeValues] = useState<Record<string, string>>(
    initValues
  );
  const [errors, setErrors] = useState(initValues);

  const { data: recipeCount } = getRecipeNumber();

  const toast = useToast();
  const navigate = useNavigate();

  const countryOptions = countries.map((country) => ({
    label: country + " " + getCountryFlag(country),
    value: country,
  }));

  const difficultyOptions = [
    { label: "Easy", value: "0" },
    { label: "Medium", value: "1" },
    { label: "Hard", value: "2" },
  ];

  const authenticityOptions = [
    { label: "Unverified", value: "Unverified" },
    { label: "Verified", value: "Verified" },
  ];

  const handleSubmit = async () => {
    let errorCounts = 0;
    let errorMessages = initValues;
    Object.keys(recipeValues).forEach((value) => {
      if (!recipeValues[value]) {
        errorCounts++;
        errorMessages = { ...errorMessages, [value]: "This field is required" };
      }
    });
    setErrors(errorMessages);
    if (!errorCounts) {
      postData("recipes", {
        ...recipeValues,
        difficulty: parseInt(recipeValues.difficulty),
        volume: parseInt(recipeValues.volume),
        serves: parseInt(recipeValues.serves),
      })
        .then(() => {
          toast({
            title: "Cretaed",
            description: "You've created a Recipe.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate(`/?index=${recipeCount}`);
        })
        .catch((err) => {
          toast({
            title: "Creation failed",
            description: err,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const setValue = (value: string, type: string) => {
    setRecipeValues((prev) => ({ ...prev, [type]: value }));
    setErrors((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <Box p="24px">
      <Flex
        gap="10px"
        pb="16px"
        borderBottom="1px solid"
        borderBottomColor="gray.50"
        mb="24px"
      >
        <Box
          w="24px"
          h="24px"
          backgroundImage="/icons/arrow-left.svg"
          backgroundSize="contain"
          backgroundPosition="center"
          cursor="pointer"
          onClick={() => navigate("/")}
        />
        <Text fontSize="18px" fontWeight="bold" color="white">
          Add new recipe
        </Text>
      </Flex>
      <Flex gap="12px" mb="24px">
        <InputGroup errorMessage={errors.name} label="Name">
          <CustomInput
            value={recipeValues.name}
            setValue={(value) => setValue(value, "name")}
          />
        </InputGroup>
        <InputGroup errorMessage={errors.origin} label="Origin">
          <CustomSelect
            options={countryOptions}
            value={recipeValues.origin}
            setValue={(value) => setValue(value, "origin")}
            placeholder="Country origin"
          />
        </InputGroup>
      </Flex>
      <Box mb="24px">
        <InputGroup errorMessage={errors.description} label="Description">
          <CustomTextarea
            value={recipeValues.description}
            setValue={(value) => setValue(value, "description")}
            placeholder="Describe your recipe..."
          />
        </InputGroup>
      </Box>
      <Flex gap="12px" mb="24px">
        <InputGroup errorMessage={errors.difficulty} label="Difficulty">
          <CustomSelect
            options={difficultyOptions}
            value={recipeValues.difficulty}
            placeholder="Select difficulty"
            setValue={(value) => setValue(value, "difficulty")}
          />
        </InputGroup>
        <InputGroup errorMessage={errors.protein} label="Protein">
          <CustomInput
            value={recipeValues.protein}
            setValue={(value) => setValue(value, "protein")}
          />
        </InputGroup>
      </Flex>
      <Flex gap="12px" mb="24px">
        <InputGroup errorMessage={errors.produce} label="Produce">
          <CustomInput
            value={recipeValues.produce}
            setValue={(value) => setValue(value, "produce")}
          />
        </InputGroup>
        <InputGroup errorMessage={errors.spice} label="Spice">
          <CustomInput
            value={recipeValues.spice}
            setValue={(value) => setValue(value, "spice")}
          />
        </InputGroup>
      </Flex>
      <Flex gap="12px" mb="24px">
        <InputGroup errorMessage={errors.cookingOil} label="Cooking Oil">
          <CustomInput
            value={recipeValues.cookingOil}
            setValue={(value) => setValue(value, "cookingOil")}
          />
        </InputGroup>
        <InputGroup errorMessage={errors.volume} label="Volume">
          <CustomInput
            value={recipeValues.volume}
            type="number"
            setValue={(value) => setValue(value, "volume")}
            right="grams"
          />
        </InputGroup>
      </Flex>
      <Flex gap="12px" mb="24px">
        <InputGroup errorMessage={errors.serves} label="Serves">
          <CustomInput
            value={recipeValues.serves}
            type="number"
            setValue={(value) => setValue(value, "serves")}
            right="people"
          />
        </InputGroup>
        <InputGroup errorMessage={errors.authenticity} label="Authenticity">
          <CustomSelect
            options={authenticityOptions}
            value={recipeValues.authenticity}
            placeholder="Select authenticity"
            setValue={(value) => setValue(value, "authenticity")}
          />
        </InputGroup>
      </Flex>
      <Box mb="24px">
        <InputGroup errorMessage={errors.stock} label="Stock">
          <CustomInput
            value={recipeValues.stock}
            setValue={(value) => setValue(value, "stock")}
          />
        </InputGroup>
      </Box>
      <Button
        fontSize="16px"
        w="full"
        bg="purple.20"
        p="9px 14px 11px 14px"
        rounded="4px"
        _hover={{ background: "purple.10" }}
        onClick={handleSubmit}
      >
        Add recipe
      </Button>
    </Box>
  );
}

export default CreateRecipe;
