import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  colors: {
    brand: [
      "#E6F7FE",
      "#C4ECFC",
      "#9EDFF8",
      "#74D1F3",
      "#4BC4EF",
      "#2FB1E5",
      "#1F8DBF",
      "#146B97",
      "#0C4A6F",
      "#052A47",
    ],
  },
  primaryColor: "brand",
});
