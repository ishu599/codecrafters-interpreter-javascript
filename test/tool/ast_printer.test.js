import { describe, expect, test } from "@jest/globals";
import { AstPrinter } from "../../app/tool/ast_printer.js";
import { Literal } from "../../app/expressions/literal.js";
import { Grouping } from "../../app/expressions/grouping.js";
import { Unary } from "../../app/expressions/unary.js";
import { Token } from "../../app/token.js";
import { Binary } from "../../app/expressions/binary.js";
import { Lox } from "../../app/lox.js";
test("Test with numbers", () => {
    let ast_printer = new AstPrinter();
    let result = ast_printer.print(new Literal(null));
    expect(result).toStrictEqual("nil");
  });
  test("Test with grouping", () => {
    let ast_printer = new AstPrinter();
    let result = ast_printer.print(new Grouping(new Literal("1.0")));
    expect(result).toStrictEqual("(group 1.0)");
  });
  test("Test with unary", () => {
    let ast_printer = new AstPrinter();
    let result = ast_printer.print(
      new Unary(new Token("BANG", "!"), new Literal("1.0")),
    );
    expect(result).toStrictEqual("(! 1.0)");
  });
  test("Test with factors", () => {
    let ast_printer = new AstPrinter();
    let result = ast_printer.print(
      new Binary(
        new Binary(
          new Literal("16.0"),
          new Token("STAR", "*", null),
          new Literal("38.0"),
        ),
        new Token("SLASH", "/", null),
        new Literal("58.0"),
      ),
    );
    expect(result).toStrictEqual("(/ (* 16.0 38.0) 58.0)");
  });
  test("Test with complicated math formula", () => {
    let lox = new Lox("22 - 58 * 27 - 76");
    lox.tokenize();
    lox.parse();
    let ast_printer = new AstPrinter();
    let result = ast_printer.print(lox.expression);
    expect(result).toStrictEqual("(- (- 22.0 (* 58.0 27.0)) 76.0)");
  });
  test("Test with complicated math formula and a lot of grouping", () => {
    let lox = new Lox("((-68 + 96) * (90 * 47)) / (25 + 69)");
    lox.tokenize();
    lox.parse();
    let ast_printer = new AstPrinter();
    let result = ast_printer.print(lox.expression);
    expect(result).toStrictEqual(
      "(/ (group (* (group (+ (- 68.0) 96.0)) (group (* 90.0 47.0)))) (group (+ 25.0 69.0)))",
    );
  });
  describe("Test comparison", () => {
    test("Simple comparison", () => {
      let lox = new Lox("1 == 2 > 2");
      lox.tokenize();
      lox.parse();
      let ast_printer = new AstPrinter();
      let result = ast_printer.print(lox.expression);
      expect(result).toStrictEqual("(> (== 1.0 2.0) 2.0)");
    });
  });
  describe("Test with sintatic errors", () => {
    test("Simple comparison", () => {
      let lox = new Lox("(15 +)");
      lox.tokenize();
      lox.parse();
      let ast_printer = new AstPrinter();
      let result = ast_printer.print(lox.expression);
      expect(result).toStrictEqual("");
    });
  });
  describe("Test with sintatic errors", () => {
    test("Simple comparison", () => {
      let lox = new Lox("(15 +)");
      lox.tokenize();
      lox.parse();
      let ast_printer = new AstPrinter();
      let result = ast_printer.print(lox.expression);
      expect(result).toStrictEqual("");
    });
  });  