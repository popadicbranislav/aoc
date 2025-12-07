export function part1(input: string[]): number {
  const parsedInput = input.map((row) => row.trim().split(/[\s]+/)).reverse();
  const instructions = parsedInput[0].map((_, colIndex) =>
    parsedInput.map((row) => row[colIndex])
  );
  // console.log(instructions)
  let total = 0;

  for (let i = 0; i < instructions.length; i++) {
    const currentIns = instructions[i];
    let op = currentIns.at(0);

    let rowTotal = +currentIns[1];
    for (let j = 2; j < currentIns.length; j++) {
      const num = +currentIns[j];
      if (op === "+") rowTotal += num;
      else rowTotal *= num;
    }

    // console.log(rowTotal);

    total += rowTotal;
  }

  return total;
}

export function part2(input: string[]): number {
  const m = input.map((l) => l.split(""));
  let total = 0;
  const instructions = m[0]
    .map((_, colIndex) => m.map((row) => row[colIndex]))
    .reverse();
  // console.log(instructions);

  let numbers = [];
  for (let i = 0; i < instructions.length; i++) {
    const row = instructions[i];
    const op = row[row.length - 1];
    const num = row.slice(0, row.length - 1).join("");
    if (+num > 0) numbers.push(+num);

    if (op === "+" || op === "*") {
      const tmp = numbers.reduce(
        (acc, cur) =>
          op === "+" ? (acc += cur) : acc === 0 ? cur : (acc *= cur),
        0
      );
      total += tmp;
      numbers = [];
    }
  }
  return total;
}

export default function solve(data: string[]): number {
  console.log("Hello from day 06");

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return data.length;
}
