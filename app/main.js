import fs from "fs";
import { Lox } from "./lox.js";
import { AstPrinter } from "./tool/ast_printer.js";
import process from "process";
const args = process.argv.slice(2); // Skip the first two arguments (node path and script path)
if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}
const command = args[0];
const filename = args[1];
if (command == "tokenize") {
  const fileContent = fs.readFileSync(filename, "utf8");
  if (fileContent.length !== 0) {
    const lox = new Lox(fileContent);
    lox.tokenize();
    for (let token of lox.scanner.tokens) {
      console.log(token.toString());
    }
    if (lox.hasError) process.exit(65);
  } else {
    console.log("EOF  null");
  }
}
if (command == "parse") {
  const fileContent = fs.readFileSync(filename, "utf8");
  const astPrinter = new AstPrinter();
  if (fileContent.length !== 0) {
    const lox = new Lox(fileContent);
    lox.tokenize();
    lox.parse();
    console.log(astPrinter.print(lox.expression));
    if (lox.hasError) process.exit(65);
  } else {
    console.log("EOF  null");
  }
}
if (command == "evaluate") {
  const fileContent = fs.readFileSync(filename, "utf8");
  if (fileContent.length !== 0) {
    const lox = new Lox(fileContent);
    lox.tokenize();
    lox.parse();
    const result = lox.evaluate();
    console.log(result);
    if (lox.hasError) process.exit(65);
  } else {
    console.log("EOF  null");
  }
}