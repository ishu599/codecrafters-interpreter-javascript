import fs from "fs";
const args = process.argv.slice(2); // Skip the first two arguments (node path and script path)
if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}
const command = args[0];
if (command !== "tokenize") {
  console.error(`Usage: Unknown command: ${command}`);
  process.exit(1);
}
const filename = args[1];
const fileContent = fs.readFileSync(filename, "utf8");
const invalidTokens = ["$", "#", "@", "%"];
let hasInvalidToken = false
if (fileContent.length !== 0) {
  const lines = fileContent.split("\n")
  lines.forEach((line, index) => {
    for (const char of line) {
      if (invalidTokens.includes(char)) {
        hasInvalidToken = true
        console.error(`[line ${index + 1}] Error: Unexpected character: ${char}`)
      }
      if (char === "(") console.log("LEFT_PAREN ( null")
      if (char === ")") console.log("RIGHT_PAREN ) null")
      if (char === "{") console.log("LEFT_BRACE { null")
      if (char === "}") console.log("RIGHT_BRACE } null")
      if (char === ",") console.log("COMMA , null")
      if (char === ".") console.log("DOT . null")
      if (char === "-") console.log("MINUS - null")
      if (char === "+") console.log("PLUS + null")
      if (char === ";") console.log("SEMICOLON ; null")
      if (char === "*") console.log("STAR * null")
      //if (char === "/") console.log("SLASH / null")
      if (char === "=") console.log("EQUAL = null")
    }
    if(line.includes("==")) console.log("EQUAL_EQUAL == null")
  })
  console.log("EOF  null")
}
else console.log("EOF  null")
if(hasInvalidToken) {
  process.exit(65)
}
