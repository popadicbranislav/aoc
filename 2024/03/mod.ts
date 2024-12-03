export function part1(data: string): number {
  const matches = data
    .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  return matches
    .toArray()
    .map((m) => +m[1] * +m[2])
    .reduce((a, b) => a + b, 0);
}

export function part2(data: string): number {
  const matches = data
    .matchAll(/(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g);

  const validInstructions = matches.toArray().map((m) => m[0]);

  let mulEnabled = true;
  let res = 0;

  validInstructions.forEach((i) => {
    if (i.startsWith("mul")) {
      if (mulEnabled) {
        const [_, a, b] = i.match(/mul\((\d{1,3}),(\d{1,3})\)/)!.map(Number);
        res += a * b;
      }
    } else if (i === "do()") {
      mulEnabled = true;
    } else if (i === "don't()") {
      mulEnabled = false;
    }
  });

  return res;
}

export default function solve(data: string[]): number {
  const input = data.join("\n");
  console.log("part1:", part1(input));
  console.log("part2:", part2(input));
  return part1(input);
}
