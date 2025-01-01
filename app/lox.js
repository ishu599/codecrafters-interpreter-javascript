import { Scanner } from "./scanner.js";
import { Parser } from "./parser.js";
import { Interpreter } from "./interpreter.js";
class Lox {
  hasError = false;
  tokens = [];
  constructor(source) {
    this.scanner = new Scanner(source, this.tokens, this);
    this.parser = new Parser(this.tokens, this);
    this.interpreter = new Interpreter();
  }
  tokenize() {
    this.scanner.tokenize();
  }
  parse() {
    this.expression = this.parser.parse();
  }
  evaluate() {
    return this.interpreter.evaluate(this.expression);
  }
}
export { Lox };