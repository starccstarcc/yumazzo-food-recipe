import { createRoot } from "react-dom/client";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import Recipe from "./pages/Recipe";
import Layout from "./layout";
import "@marcius-capital/fonts";
import "./index.css";
import CreateRecipe from "./pages/CreateRecipe";

const root = createRoot(document.getElementById("root")!);

root.render(
  <MemoryRouter>
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Layout>
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route path="/add" element={<CreateRecipe />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  </MemoryRouter>
);
