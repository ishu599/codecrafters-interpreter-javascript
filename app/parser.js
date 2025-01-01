export class ParseError extends Error {
    constructor(token, ...rest) {
      super(...rest);
      this.token = token;
      this.name = 'ParseError';
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ParseError);
      }
    }
  }
  export function parse(tokens) {
    let idx = 0;
    const check = (type) => tokens[idx].type === type;
    const advance = () => tokens[idx++];
    const peek = (i = 0) => tokens[idx + i];
    const previous = () => tokens[idx - 1];
    const match = (...types) => {
      for (const type of types) {
        if (check(type)) {
          advance();
          return true;
        }
      }
      return false;
    };
    const consume = (type, message) => {
      if (check(type)) return advance();
      throw new ParseError(peek(), message);
    };
    const primary = () => {
        if (match('FALSE')) return ['literal', false, false];
    if (match('TRUE')) return ['literal', true, true];
    if (match('NIL')) return ['literal', 'nil', 'nil'];
    if (match('NUMBER'))
      return ['literal', previous().litteral, +previous().litteral];
    if (match('STRING'))
      return ['literal', previous().litteral, previous().litteral];
    if (match('IDENTIFIER')) return ['identifier', previous().name];
    if (match('LEFT_PAREN')) {
      const expr = expression();
      consume('RIGHT_PAREN', 'Expected ")" after expression.');
      return ['grouping', expr];
    }
  };
  const unary = () => {
    if (match('BANG', 'MINUS')) {
      const operator = previous();
      const right = unary();
      return ['unary', operator, right];
    }
    return primary();
  };
  const factor = () => {
    let expr = unary();
    while (match('SLASH', 'STAR')) {
      const operator = previous();
      const right = unary();
      expr = ['binary', expr, operator, right];
    }
    return expr;
  };
  const term = () => {
    let expr = factor();
    while (match('MINUS', 'PLUS')) {
      const operator = previous();
      const right = factor();
      if (!right) throw new ParseError(peek(), 'Expected right operand');
      expr = ['binary', expr, operator, right];
    }
    return expr;
  };
  const comparison = () => {
    let expr = term();
    while (match('GREATER', 'GREATER_EQUAL', 'LESS', 'LESS_EQUAL')) {
      const operator = previous();
      const right = term();
      if (!right) throw new ParseError(peek(), 'Expected right operand');
      expr = ['binary', expr, operator, right];
    }
    return expr;
  };
  const equality = () => {
    let expr = comparison();
    while (match('BANG_EQUAL', 'EQUAL_EQUAL')) {
      const operator = previous();
      const right = comparison();
      expr = ['binary', expr, operator, right];
    }
    return expr;
  };
  const expression = () => equality();
  try {
    const ast = expression();
    return ast;
  } catch (e) {
    if (e instanceof ParseError) {
      console.error(
        `[line ${e.token.line}]`,
        `error at '${e.token.text}'`,
        e.message
      );
    } else {
      console.error(e.message);
    }
    return null;
  }
}
export function printAst(ast) {
  if (!ast) return '';
  const [type, ...children] = ast;
  if (type === 'binary') {
    const left = printAst(children[0]);
    const right = printAst(children[2]);
    return `(${children[1].text} ${left} ${right})`;
  } else if (type === 'literal') {
    return children[0];
  } else if (type === 'grouping') {
    return `(group ${printAst(children[0])})`;
  } else if (type === 'unary') {
    return `(${children[0].text} ${printAst(children[1])})`;
  } else {
    console.log('?', type, children);
  }
}