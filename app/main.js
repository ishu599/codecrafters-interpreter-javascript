import fs from 'fs';
import { scan } from './scanner.js';
import { parse, printAst } from './parser.js';
import { evaluate } from './evaluate.js';
const args = process.argv.slice(2); // Skip the first two arguments (node path and script path)
if (args.length < 2) {
  console.error('Usage: ./your_program.sh tokenize <filename>');
  process.exit(65);
}
const command = args[0];
if (command === 'tokenize') {
  const filename = args[1];
  const fileContent = fs.readFileSync(filename, 'utf8');
  const { tokens, errors } = scan(fileContent);
  for (const token of tokens) {
    console.log(token.type, token.text, token.litteral);
  }
  if (errors > 0) {
    process.exit(65);
  }
} else if (command === 'parse') {
  const filename = args[1];
  const fileContent = fs.readFileSync(filename, 'utf8');
  const { tokens, errors } = scan(fileContent);
  if (errors > 0) {
    process.exit(65);
  }
  let ast = parse(tokens);
  if (ast) console.log(printAst(ast));
  else process.exit(65);
} else if (command === 'evaluate') {
  const filename = args[1];
  const fileContent = fs.readFileSync(filename, 'utf8');
  const { tokens, errors } = scan(fileContent);
  if (errors > 0) {
    process.exit(65);
  }
  let ast = parse(tokens);
  if (!ast) process.exit(65);
  const result = evaluate(ast);
  console.info(result);
} else {
  console.error('Unknown command:', command);
  process.exit(1);
}
