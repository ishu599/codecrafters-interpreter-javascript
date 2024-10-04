import fs from "fs";
import { isNumericLiteral } from "typescript";
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
// // You can use print statements as follows for debugging, they'll be visible when running tests.
// console.error("Logs from your program will appear here!");
const filename = args[1];
// Uncomment this block to pass the first stage
const fileContent = fs.readFileSync(filename, "utf8");
let token = "";
let error = "";
if (fileContent.length !== 0) {
  // throw new Error("Scanner not implemented");
  const fileLines = fileContent.split("\n");
  for(let i=0;i<fileLines.length;i++){
    const str = fileLines[i];
    for(let j=0;j<str.length;j++){
      if(str[j]==" " || str[j]=="\t"){
        continue;
      }
      else if(str[j]=="("){
        token+="LEFT_PAREN ( null\n";
      }
      else if(str[j]==")"){
        token+="RIGHT_PAREN ) null\n";
      }
      else if(str[j]=="{"){
        token+="LEFT_BRACE { null\n";
      }
      else if(str[j]=="}"){
        token+="RIGHT_BRACE } null\n";
      }
      else if(str[j]==","){
        token+="COMMA , null\n";
      }
      else if(str[j]=="."){
        token+="DOT . null\n";
      }
      else if(str[j]=="*"){
        token+="STAR * null\n";
      }
      else if(str[j]=="+"){
        token+="PLUS + null\n";
      }
      else if(str[j]=="-"){
        token+="MINUS - null\n";
      }
      else if(str[j]==";"){
        token+="SEMICOLON ; null\n";
      }
      else if (Number(str[j])) {
        let num = 0;
        let count = 1;
        while (Number(str[j])) {
          num += str[j] * count;
          count *= 10;
        }
        if (Number.isInteger(num)) {
          token += `Number ${num} ${num}.0\n`;
        }
        else {
          token += `Number ${num} ${num}\n`;
        }
      }
      else if(str[j]=='"'){
        let nextStringLiteral = str.indexOf('"', j+1);
        if(nextStringLiteral == -1){
          error += `[line ${i+1}] Error: Unterminated string.`
          break;
        }
        else{
          let stringIn = str.slice(j+1, nextStringLiteral);
          token += `STRING "${stringIn}" ${stringIn}\n`;
          j = nextStringLiteral;
          continue;
        }
      }
      else if(str[j]=="/"){
        if(j+1<str.length && str[j+1]=="/"){
          break;
        }
        else{
          token+="SLASH / null\n";
        }
      }
      else if(str[j]=="<"){
        if(j+1<str.length && str[j+1]=="="){
          j+=1;
          token+="LESS_EQUAL <= null\n";
        }
        else{
          token+="LESS < null\n";
        }
      }
      else if(str[j]==">"){
        if(j+1<str.length && str[j+1]=="="){
          j+=1;
          token+="GREATER_EQUAL >= null\n";
        }
        else{
          token+="GREATER > null\n";
        }
      }
      else if(str[j]=="!"){
        if(j+1<str.length && str[j+1]=="="){
          j+=1;
          token+="BANG_EQUAL != null\n";
        }
        else{
          token+="BANG ! null\n";
        }
      }
      else if(str[j]=="="){
        if(j+1<str.length && str[j+1]=="="){
          j+=1;
          token+="EQUAL_EQUAL == null\n";
        }
        else{
          token+="EQUAL = null\n";
        }
      }
      else{
        if(error!==""){
          error+="\n";
        }
        error+=`[line ${i+1}] Error: Unexpected character: ${str[j]}`
      }
    }
  }
}
token+="EOF  null"
if(error !== ""){
  console.error(error);
}
console.log(token);
if(error !== ""){
  process.exit(65);
}