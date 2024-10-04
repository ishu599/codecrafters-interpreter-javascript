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
let hasInvalidToken = false;
if (fileContent.length !== 0) {
  const lines = fileContent.split("\n")
  lines.forEach((line, index) => {
    for (let i = 0;i < line.length;i++) {
      if (invalidTokens.includes(line[i])) {
        hasInvalidToken = true;
        console.error(`[line ${index + 1}] Error: Unexpected character: ${line[i]}`)
      }
      if (line[i] === "(") console.log("LEFT_PAREN ( null")
      if (line[i] === ")") console.log("RIGHT_PAREN ) null")
      if (line[i] === "{") console.log("LEFT_BRACE { null")
      if (line[i] === "}") console.log("RIGHT_BRACE } null")
      if (line[i] === ",") console.log("COMMA , null")
      if (line[i] === ".") console.log("DOT . null")
      if (line[i] === "-") console.log("MINUS - null")
      if (line[i] === "+") console.log("PLUS + null")
      if (line[i] === ";") console.log("SEMICOLON ; null")
      if (line[i] === "*") console.log("STAR * null")
      //if (line[i] === "/") console.log("SLASH / null")
      if (line[i] === "=" && line[i+1] != "=") console.log("EQUAL = null")
     if (line[i] === "=" && line[i+1] === "=") {console.log("EQUAL_EQUAL == null");
      i = i + 1;
     }
      if (line[i] === "!" && line[i+1] != "=") console.log("BANG ! null")
        if (line[i] === "!" && line[i+1] === "=") {i = i + 1;
          console.log("BANG_EQUAL != null");
        }
        if (line[i] === "<" && line[i+1] === "=") {
          i = i + 1;
          console.log("LESS_EQUAL <= null");
        }
      if (line[i] === "<") console.log("LESS < null")
       
        if (line[i] === ">" && line[i+1] === "=") {
          i = i + 1;
          console.log("GREATER_EQUAL >= null");
        }
        if (line[i] === ">") console.log("GREATER > null")
          
          if (line[i] === "/" && line[i+1] === "/") {break;}
      if (line[i] === "/") console.log("SLASH / null")
      if (line[i] === " ") continue;
      if (line[i] === "  ") continue;
      if (line[i] === '"') {
        let nextStringLiteral = line.indexOf('"', j+1);
        if(nextStringLiteral == -1){
          error += `[line ${i+1}] Error: Unterminated string.`;
          hasInvalidToken = true;
          break;
        }
        else{
          let stringIn = line.slice(j+1, nextStringLiteral);
          token += `STRING "${stringIn}" ${stringIn}\n`;
          j = nextStringLiteral;
          continue;
        }
      }
    }
    
  })
  if (hasInvalidToken) {
    process.exit(65);
  }
  console.log("EOF  null")
}
else console.log("EOF  null");
if(hasInvalidToken) {
  process.exit(65)
}
