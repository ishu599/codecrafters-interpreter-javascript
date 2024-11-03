import fs from "fs";

import { isFloat64Array } from "util/types";

const args = process.argv.slice(2); // Skip the first two arguments (node path and script path)
if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}
const command = args[0];

// // You can use print statements as follows for debugging, they'll be visible when running tests.
// console.error("Logs from your program will appear here!");
const filename = args[1];
// Uncomment this block to pass the first stage
const fileContent = fs.readFileSync(filename, "utf8");
const TOKENS = {LEFT_PAREN: "LEFT_PAREN",
  RIGHT_PAREN: "RIGHT_PAREN",
  LEFT_BRACE: "LEFT_BRACE",
  RIGHT_BRACE: "RIGHT_BRACE",
  COMMA: "COMMA",
  DOT: "DOT",
  MINUS: "MINUS",
  PLUS: "PLUS",
  SEMICOLON: "SEMICOLON",
  STAR: "STAR",
  EOF: "EOF",
  BANG: "BANG",
  BANG_EQUAL: "BANG_EQUAL",
  EQUAL: "EQUAL",
  EQUAL_EQUAL: "EQUAL_EQUAL",
  GREATER: "GREATER",
  GREATER_EQUAL: "GREATER_EQUAL",
  LESS: "LESS",
  LESS_EQUAL: "LESS_EQUAL",
  SLASH: "SLASH",
  STRING: "STRING",
  NUMBER: "NUMBER",
  IDENTIFIER: "IDENTIFIER"};

  const RESERVED_WORDS = {
  AND: "and",
  CLASS: "class",
  ELSE: "else",
  FALSE: "false",
  FOR: "for",
  FUN: "fun",
  IF: "if",
  NIL: "nil",
  OR: "or",
  PRINT: "print",
  RETURN: "return",
  SUPER: "super",
  THIS: "this",
  TRUE: "true",
  VAR: "var",
  WHILE: "while",
};

// to call the function based on the command
if (command === "tokenize") {
  tokenize(command);
}
else if (command === "evaluate") {
  evaluate(command);
}
else {
  unknowncommand(command);
}
let token = [];
let error = [];
function printToken(token) {
  console.log(
    `${token.token_type} ${token.lexeme} ${token.literal ? token.litral : "null"}`
  );
}
function isDigit(ch) {
  if(ch >= "0" && ch <= "9") {
    return true;
  }
  return false;
}

function isAlpha(ch) {
  if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
    return true;
  }
}
const operators = ['+','-','*','/'];
let haserror = false;
// if command does not match any known command
function unknowncommand (command) {
  console.error(`Usage: Unknown command: ${command}`);
  process.exit(1);
}
function isInstance (number, type) {
  if(type === 'string') {
    if (typeof number === 'string') {
      return true;
    }
    return false;
  }
  else if(type === 'number') {
    if (typeof number === 'number') {
      return true;
    }
    return false;
  }
  else if(type === 'float') {
    if (typeof number === 'float') {
      return true;
    }
    return false;
  }
  else if(type === 'bool') {
    if (typeof number === 'bool') {
      return true;
    }
    return false;
  }
  return false;
}
// when the command is evaluate
function evaluate (fileContent) {
  if( fileContent.length != 0) {
  
  const text = fileContent.split(" ");
  const left = text[0];
  const right = text[2];
  const middle = text[1];
  if (left === true) {{
    return left;
  }
  return true;
  }
  else if (middle === '-') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left - right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '+') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left + right;
    }
    else if (isInstance(left,'string') && isInstance(right,'string')) {
      return left + right;}
    else console.error("Operands must be two numbers or two strings.");
  }
  else if (middle === '/') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left / right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '*') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left * right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '>') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left > right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '>=') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left >= right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '<') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left < right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '<=') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left <= right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '!=') {
    if(isInstance(left,'float') && isInstance(right,'float')) {
      return left != right;
    }
    else console.error("operand must be a number");
  }
  else if (middle === '===') {
    if (left === null && right === null) return true;
    else if (left === null) return false;
    return left === right; 
  }
  
    
    
    else if (left === null) return false;
  }
}





// when the command is tokenize

function tokenize (fileContent) {
if (fileContent.length !== 0) {
  // throw new Error("Scanner not implemented");
  const fileLines = fileContent.split("\n");
  
  for(let i=0;i<fileLines.length;i++){
    const str = fileLines[i];
    for(let j=0;j<str.length;j++){
     
      if(str[j]=="("){
        token+= `${TOKENS.LEFT_PAREN} ${str[j]} null\n`;
      }
      else if(str[j]==")"){
        token+=`${TOKENS.RIGHT_PAREN} ) null\n`;
      }
      else if(str[j]=="{"){
        token+=`${TOKENS.LEFT_BRACE} { null\n`;
      }
      else if(str[j]=="}"){
        token+=`${TOKENS.RIGHT_BRACE} } null\n`;
      }
      else if(str[j]==","){
        token+=`${TOKENS.COMMA} , null\n`;
      }
      else if(str[j]=="."){
        token+=`${TOKENS.DOT} . null\n`;
      }
      else if(str[j]=="*"){
        token+=`${TOKENS.STAR} * null\n`;
      }
      else if(str[j]=="+"){
        token+=`${TOKENS.PLUS} + null\n`;
      }
      else if(str[j]=="-"){
        token+=`${TOKENS.MINUS} - null\n`;
      }
      else if(str[j]==";"){
        token+=`${TOKENS.SEMICOLON} ; null\n`;
      }
      
      // identify if the line contains any identiier word
      else if ((str[j] >= 'a' && str[j] <= 'z') || (str[j] >= 'A' && str[j] <= 'Z') || str[j]=="_") {
        
        let string_identifier = "";
        let startingindex = j;
        while((str[j] >= 'a' && str[j] <= 'z') || (str[j] >= 'A' && str[j] <= 'Z') || str[j]=="_" || (str[j] >= '0' && str[j] <= '9')) {
          j++;
        }
        string_identifier = str.slice(startingindex,j);
        const captialstring = string_identifier.toUpperCase();
        for (const tokens in TOKENS) {
          if (tokens === string_identifier) {
            token += `${TOKENS.captialstring} ${string_identifier} null\n`;
            break;
          }
        }
        // find length of string to check the last character of string for _
        
          token += `IDENTIFIER ${string_identifier} null\n`;
          j--;
        haserror = true;
        continue;
      }
      else if(str[j]==" " || str[j]=="\t"){
        continue;
      }
      else if (isDigit(str[j])) {
        const startDigit = j;
        while (j < str.length && str[j] >= '0' && str[j] <= '9') {
          j++;
        }
        if (str[j] === "." && j + 1 < str.length && str[j + 1] >= '0' && str[j + 1] <= '9') {
          j++;
          while ( j < str.length && str[j] >= '0' && str[j] <= '9') {
            j++;
          }
        }
        const numberString = str.slice(startDigit,j);
        j--;
        let num = parseFloat(numberString);
        if (Number.isInteger(num)) {
          let formattedNum = num.toFixed(1);
          token += `NUMBER ${numberString} ${formattedNum}\n`;
        }
        else {
          token += `NUMBER ${numberString} ${numberString}\n`;
        }
      }
      // to check if any reserved words is present
      else if (isAlpha(str[j]) || str[j] === '_') {
        let string2 = "";
        let count = j;
        while(count < str.length && str[count] != ' ' && str[count] != '(' && str[count] != ')') {
          string2 += str[count];
          count++;
        }
        j = count-1;

        let index = Object.values(RESERVED_WORDS).indexOf(string2);
        if (index > -1) {
          token += `${string2.toUpperCase()} ${string2.toLowerCase()} null\n`;
        }
        else {token += `IDENTIFIER ${string2} null\n`;}
      }
      // identify if the line contains any identiier word
      
      else if(str[j]==" " || str[j]=="\t"){
        continue;
      }
      
      else if(str[j]=='"'){
        let nextStringLiteral = str.indexOf('"', j+1);
        if(nextStringLiteral == -1) {
          error += `[line ${i+1}] Error: Unterminated string.\n`;
          haserror = true;
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
        error += (`[line ${Number.parseInt(i) + 1}] Error: Unexpected character: ${str[j]}`)
    haserror = true
      }
      
    } 
  }
    
}
token+="EOF  null"
if(error !== ""){
  console.error(error);

}
console.log(token);
}

if (!haserror) {
  process.exit(0);
}



if(error !== ""){
  process.exit(65);
}
console.log(final_value);