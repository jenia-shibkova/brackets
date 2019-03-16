function isOpened(element, bracketsConfig) {
  return bracketsConfig.some((brackets) => brackets[0] === element);
}

function isClosed(element, bracketsConfig) {
  return bracketsConfig.some((brackets) => brackets[1] === element);
}

function getOpposite(element, bracketsConfig) {
  let opposite;

  bracketsConfig.forEach((brackets) => {
    if (brackets[0] === element) {
      opposite = brackets[1];
    } else if (brackets[1] === element){
      opposite = brackets[0];
    }
  });

  return opposite;
}

module.exports = function check(str, bracketsConfig) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    let bracket = str[i];
    let last = stack[stack.length - 1];
    let openedBracket = isOpened(bracket, bracketsConfig);
    let closedBracket = isClosed(bracket, bracketsConfig);
    let oppositeBracket = getOpposite(bracket, bracketsConfig);

    if (stack.length === 0) {
      stack.push(bracket);
      continue;
    }

    if (oppositeBracket === bracket && last === bracket) {
      stack.pop();
      continue;
    }

    if (openedBracket) {
      stack.push(bracket);
      continue;
    }
    
    if (closedBracket) {
      if (getOpposite(last, bracketsConfig) !== bracket) {
        return false;
      } else {
        stack.pop();
        continue;
      }
    }
  }

  return stack.length === 0;
}
