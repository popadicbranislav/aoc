export function part1(input: string[]): number {
  let position = 50;
  let zeroHits = 0;

  for (const line of input) {
    const turn = line[0];
    const distance = parseInt(line.substring(1)) % 100;

    if (turn === "L") {
      position -= distance;
    } else if (turn === "R") {
      position += distance;
    }

    if (position < 0) {
      position = 100 + position;
    }
    if (position > 99) {
      position = position - 100;
    }

    if (position === 0) zeroHits++;
  }

  return zeroHits;
}

export function part2(input: string[]): number {
  let position = 50;
  let zeroHits = 0;

  for (const line of input) {
    const turn = line[0];
    const distance = parseInt(line.substring(1));

    for (let i = 0; i < distance; i++) {
      if (turn === "L") {
        position -= 1;
      } else if (turn === "R") {
        position += 1;
      }

      if (position < 0) {
        position = 99;
      } else if (position > 99) {
        position = 0;
      }

      if (position === 0) zeroHits++;
    }
  }

  return zeroHits;
}

export default function solve(data: string[]): number {
  console.log("Hello from day 1");

  // console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return 0;
}
