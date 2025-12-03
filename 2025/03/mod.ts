export function part1(bankOfBatteries: string[]): number {
  let total = 0;

  for (const bank of bankOfBatteries) {
    let maxJoltage = 0;
    for (let i = 0; i <= bank.length - 1; i++) {
      const first = bank[i];
      for (let j = i + 1; j <= bank.length; j++) {
        const second = bank[j];

        const value = +(first + second);
        if (value > maxJoltage) maxJoltage = value;
      }
    }
    total += maxJoltage;
  }

  return total;
}

export function part2(input: string[]): number {
  let total = 0;
  let index = 1;
  const maxLength = 12;

  for (const bank of input) {
    console.log(`Processing bank ${index++}/${input.length}`);

    let currentIndex = 0;
    let resultVal = "";
    for (let i = maxLength - 1; i >= 0; i--) {
      const substr = bank.substring(currentIndex, bank.length - i);
      const { index, value } = firstHighest(substr);
      resultVal += value.toString();
      currentIndex += index + 1;
    }
    const maxJoltage = parseInt(resultVal);
    total += maxJoltage;
  }

  return total;
}

function firstHighest(s: string): { index: number; value: number } {
  let max = 0;
  let index = -1;
  for (let i = 0; i < s.length; i++) {
    const num = parseInt(s[i]);
    if (num > max) {
      max = num;
      index = i;
    }
    if (num === 9) break;
  }

  return { index, value: max };
}

export default function solve(data: string[]): number {
  console.log("Hello from day 03");

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return data.length;
}
