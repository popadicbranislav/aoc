function getCombinationOfItems(items: string[], length: number) {
  const combinations: string[][] = [];

  const nOfPermutations = items.length ** length;

  for (let i = 0; i < nOfPermutations; i++) {
    const combination: string[] = [];
    let index = i;
    for (let j = 0; j < length; j++) {
      combination.push(items[index % items.length]);
      index = Math.floor(index / items.length);
    }
    combinations.push(combination);
  }

  return combinations;
}

function evaluate(values: number[], operands: string[]): number {
  let result = values[0];
  for (let i = 0; i < values.length - 1; i++) {
    const value = values[i + 1];
    const operand = operands[i];

    if (operand === "+") {
      result += value;
    } else if (operand === "*") {
      result *= value;
    }
  }

  return result;
}


export function part1(input: string[]): number {
  const availableOperands = ["+", "*"];

  const validResults: number[] = [];

  input.forEach((line) => {
    const [result, ...values] = line.replace(":", "").split(" ").map((x) => +x);

    const operandCombinations = getCombinationOfItems(
      availableOperands,
      values.length - 1,
    );

    for (const operands of operandCombinations) {
      const testResult = evaluate(values, operands);

      if (result === testResult) {
        validResults.push(result);
        break;
      }
    }

    // console.log(result, " should equal ", values);
  });

  // console.log("validResults", validResults);

  return validResults.reduce((a, b) => a + b, 0);
}


function evaluate2(values: number[], operands: string[]): number {
  let result = values[0];
  for (let i = 0; i < values.length - 1; i++) {
    const value = values[i + 1];
    const operand = operands[i];

    if (operand === "+") {
      result += value;
    } else if (operand === "*") {
      result *= value;
    } else if(operand === "||") {
      result = +`${result}${value}`
    }
  }

  return result;
}

export function part2(input: string[]): number {
  const availableOperands = ["+", "*", "||"];

  const validResults: number[] = [];

  input.forEach((line) => {
    const [result, ...values] = line.replace(":", "").split(" ").map((x) => +x);

    const operandCombinations = getCombinationOfItems(
      availableOperands,
      values.length - 1,
    );

    for (const operands of operandCombinations) {
      const testResult = evaluate2(values, operands);

      if (result === testResult) {
        validResults.push(result);
        break;
      }
    }

    // console.log(result, " should equal ", values);
  });

  // console.log("validResults", validResults);

  return validResults.reduce((a, b) => a + b, 0);
}

export default function solve(data: string[]): number {
  console.log("Hello from day 07");

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));


  return data.length;
}
