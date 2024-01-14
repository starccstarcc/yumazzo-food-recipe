import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: { initialColorMode: "dark" },
  colors: {
    black: {
      10: "#0D1119",
      20: "#121826",
      30: "#131823",
      35: "#171F2F",
      40: "#181F30",
      50: "#AEB5C1",
    },
    gray: {
      10: "#7185AA",
      20: "#6B7280",
      30: "#43495E",
      40: "#E9EAF6",
      50: "#2E3347",
    },
    blue: {
      10: "#17CFC4",
    },
    purple: {
      10: "#41479B",
      20: "#764AF4",
    },
    green: {
      10: "#6CF600",
    },
  },
});
