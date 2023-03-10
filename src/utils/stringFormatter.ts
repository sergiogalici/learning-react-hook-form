export const stringFormatter = (string: string): string => {
  if (string.includes(".")) {
    const lastField = stringFormatter(string.split(".").pop() ?? "");
    return lastField.split(" ").length < 2
      ? lastField
      : lastField.split(" ")[0].concat(" " + lastField.split(" ")[1]);
  }
  return string.split("").reduce((acc, char, i) => {
    const newChar: string =
      i === 0
        ? char.toUpperCase()
        : char === char.toUpperCase()
        ? ` ${char}`
        : char;
    acc += newChar;
    return acc;
  }, "");
};
