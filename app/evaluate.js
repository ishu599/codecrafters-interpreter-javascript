export function evaluate(ast) {
    if (!ast) return null;
    const [type, ...children] = ast;
    if (type === 'binary') {
      const left = evaluate(children[0]);
      const right = evaluate(children[2]);
      if (children[1].type === 'PLUS') {
        return left + right;
      } else if (children[1].type === 'MINUS') {
        return left - right;
      } else if (children[1].type === 'STAR') {
        return left * right;
      } else if (children[1].type === 'SLASH') {
        return left / right;
      } else {
        console.warn('? not handled', children[1]);
      }
    } else if (type === 'literal') {
      return children[1];
    } else if (type === 'grouping') {
      return evaluate(children[0]);
    } else if (type === 'unary') {
      if (children[0].type === 'MINUS') {
        return -evaluate(children[1]);
      } else {
        console.warn('? not handled', children[0]);
      }
    } else {
      console.log('?', type, children);
    }
  }