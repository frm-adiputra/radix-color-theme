import * as colors from "@radix-ui/colors";

const availableColors = [
  ...new Set(
    Object.keys(colors).map((e) =>
      e.replace(/(Dark|A|DarkA|P3|DarkP3|P3A|DarkP3A)$/, "")
    )
  ),
] as const;
type AvailableColors = (typeof availableColors)[number];
const colorSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

console.log(availableColors);
