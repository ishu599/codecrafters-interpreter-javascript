import { describe, expect, test } from "@jest/globals";
import { Interpreter } from "../app/interpreter.js";
import { Binary } from "../app/expressions/binary.js";
import { Literal } from "../app/expressions/literal.js";
import { Token } from "../app/token.js";
describe("Interpreter", () => {
  test("Basic math", () => {
    let interpreter = new Interpreter();
    let expression = new Binary(
      new Literal("16.0"),
      new Token("PLUS", "+", null),
      new Literal("38.0"),
    );
    const result = interpreter.evaluate(expression);
    expect(result).toStrictEqual(54);
  });
  test("Basic boolean", () => {
    let interpreter = new Interpreter();
    let expression = new Literal(true);
    const result = interpreter.evaluate(expression);
    expect(`${result}`).toStrictEqual("true");
  });
});