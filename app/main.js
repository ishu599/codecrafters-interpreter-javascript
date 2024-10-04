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
let error = "";
let token = "";
if (fileContent.length !== 0) {
  const lines = fileContent.split("\n")
  lines.forEach((line, index) => {
    for (let i = 0;i < line.length;i++) {
      if (invalidTokens.includes(line[i])) {
        hasInvalidToken = true;
        error += `[line ${index + 1}] Error: Unexpected character: ${line[i]}`;
      }
      if (line[i] === "(") token += "LEFT_PAREN ( null\n";
      if (line[i] === ")") token += "RIGHT_PAREN ) null\n";
      if (line[i] === "{") token += "LEFT_BRACE { null\n";
      if (line[i] === "}") token += "RIGHT_BRACE } null\n";
      if (line[i] === ",") token += "COMMA , null\n";
      if (line[i] === ".") token += "DOT . null\n";
      if (line[i] === "-") token += "MINUS - null\n";
      if (line[i] === "+") token += "PLUS + null\n";
      if (line[i] === ";") token += "SEMICOLON ; null\n";
      if (line[i] === "*") token += "STAR * null\n";
      //if (line[i] === "/") console.log("SLASH / null\n")
      if (line[i] === "=" && line[i+1] != "=") token += "EQUAL = null\n";
     if (line[i] === "=" && line[i+1] === "=") {token += "EQUAL_EQUAL == null\n";
      i = i + 1;
     }
      if (line[i] === "!" && line[i+1] != "=") token += "BANG ! null\n";
        if (line[i] === "!" && line[i+1] === "=") {i = i + 1;
          token += "BANG_EQUAL != null\n";
        }
        if (line[i] === "<" && line[i+1] === "=") {
          i = i + 1;
          token += "LESS_EQUAL <= null\n";
        }
      if (line[i] === "<") token += "LESS < null\n";
       
        if (line[i] === ">" && line[i+1] === "=") {
          i = i + 1;
          token += "GREATER_EQUAL >= null\n";
        }
        if (line[i] === ">") token += "GREATER > null\n";
          
          if (line[i] === "/" && line[i+1] === "/") {break;}
      if (line[i] === "/") token += "SLASH / null\n";
      if (line[i] === " ") continue;
      if (line[i] === "  ") continue;
      if (line[i] === '"') {
        
        let nextStringLiteral = line.indexOf('"', i+1);
        if(nextStringLiteral === '-1') {
          error += `[line ${index+1}] error: Unterminated string.`;
          hasInvalidToken = true;
          break;
        }
        else {
          let stringIn = line.slice(i+1, nextStringLiteral);
          
        
        token += `STRING "${stringIn}" ${stringIn}\n`;
        i = nextStringLiteral;
        continue;
      }
    }
  }
    
  })
  if (hasInvalidToken) {
    process.exit(65);
  }
  token += "EOF  null\n";
  if (error !== "") {
    error += '\n';
  }
  if(error !== ""){
    console.error(error);}
}
else token += "EOF  null\n";
console.log(token)
if(error !== ""){
  process.exit(65);
}
