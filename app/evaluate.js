// when the command is evaluate


export function evaluate (fileContent) {
    if( fileContent.length != 0) {
    let fileLines2 = File(fileContent).readFileSync();
    let text = fileLines2.split(" ");
    let left = text[0];
    let right = text[2];
    if (text[1] === '-') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left - right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '+') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left + right;
      }
      else if (isInstance(left,'string') && isInstance(right,'atring')) {
        return left + right;}
      else console.error("Operands must be two numbers or two strings.");
    }
    else if (text[1] === '/') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left / right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '*') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left * right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '>') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left > right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '>=') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left >= right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '<') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left < right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '<=') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left <= right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '!=') {
      if(isInstance(left,'float') && isInstance(right,'float')) {
        return left != right;
      }
      else console.error("operand must be a number");
    }
    else if (text[1] === '===') {
      if (left === null && right === null) return true;
      else if (left === null) return false;
      return left === right; 
    }
    
      else if (left === null) return false;
      else if (isInstance(left, "bool")) {
        return left;
      }
      return true;
    
    }
  }
  