export function part1(input: string[]): number {
  const data = input.map((line) => line.split(""));

  const startIndex = data.shift()?.indexOf("S");
  if (startIndex === undefined) throw new Error("Start not found");

  let nOfSplits = 0;

  for (let i = 0; i < input.length; i++) {
    const row = data[i];
    if (i === 0) {
      if (row[startIndex] === "^") {
        row[startIndex - 1] = "|";
        row[startIndex + 1] = "|";
      } else {
        row[startIndex] = "|";
      }
    }

    if (i === data.length - 1) break;
    const nextRow = data[i + 1];

    for (let j = 0; j < row.length; j++) {
      if (row[j] === "|") {
        if (nextRow[j] === "^") {
          if (j > 0 && nextRow[j - 1] !== "^") nextRow[j - 1] = "|";
          if (j < nextRow.length - 1 && nextRow[j + 1] !== "^") {
            nextRow[j + 1] = "|";
          }
          nOfSplits++;
        } else {
          nextRow[j] = "|";
        }
      }
    }
  }
  // console.log(data)

  return nOfSplits;
}

export function part2(input: string[]): number {
  const data = input.map((line) => line.split(""));

  const startIndex = data[0].indexOf("S");
  if (startIndex === -1) throw new Error("Start not found");

  return tracePaths(data, 0, startIndex) + 1;
}

const memo = new Map<string, number>();


function tracePaths(data: string[][], rowIndex: number, index: number): number {
  let splits = 0;

  const key = `${rowIndex}-${index}`;

  const cached = memo.get(key)
  if(cached){
    return cached
  }

  const row = data[rowIndex];
  const nextRow = rowIndex + 1;
  if (nextRow >= data.length) return 0;
  if (row[index] === "^") {
    splits++;
    if (index > 0) {
      splits += tracePaths(data, nextRow, index - 1);
    }
    if (index < row.length - 1) {
      splits += tracePaths(data, nextRow, index + 1);
    }
  } else {
    splits += tracePaths(data, nextRow, index);
  }

  memo.set(key, splits)

  return splits;
}

export default function solve(data: string[]): number {
  console.log("Hello from day 07");

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return data.length;
}
