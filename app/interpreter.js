
class Interpreter {
    evaluate(expression) {
      return expression.accept(this);
    }
    visitBinaryExpr(expression) {
      const left = this.evaluate(expression.left);
      const right = this.evaluate(expression.right);
      switch (expression.operator.type) {
        case "PLUS":
          return parseFloat(left) + parseFloat(right);
      }
    }
    visitLiteralExpr(expression) {
      if (expression.value == null) return "nil";
      return expression.value;
    }
  }
  export { Interpreter };
  