import { describe, test, jest } from "@jest/globals";
import { Lox } from "../app/lox.js";
import { Token } from "../app/token.js";
import { Literal } from "../app/expressions/literal.js";
test("Lox tokenize", () => {
  let lox = new Lox("1 + 1");
  lox.tokenize();
  expect(lox.tokens).toStrictEqual([
    new Token("NUMBER", "1", "1.0", 1),
    new Token("PLUS", "+", null, 1),
    new Token("NUMBER", "1", "1.0", 1),
    new Token("EOF", "", null, 1),
  ]);
});
test("Lox parse", () => {
  let lox = new Lox("1");
  lox.tokenize();
  lox.parse();
  expect(lox.expression).toStrictEqual(new Literal("1.0"));
});
describe("Syntactic errors", () => {
  test("Lox parse", () => {
    const logSpy = jest.spyOn(global.console, "error");
    let lox = new Lox('"foo');
    lox.tokenize();
    lox.parse();
    expect(logSpy).toHaveBeenCalledWith("[line 1] Error: Unterminated string.");
    expect(lox.hasError).toStrictEqual(true);
  });
});