export function part1(input: string[]): number {

  let sumOfInvalidIds = 0;

  const ranges = input.join("")
    .split(",")
    .map((range) => range.split("-").map(Number));

  for (const range of ranges) {
    const [start, end] = range;
    for (let id = start; id <= end; id++) {
      if (isInvalidId(id)) {
        // console.log(`Invalid ID found: ${id} in range ${start}-${end}`);
        sumOfInvalidIds += id;
      }
    }
  }

  return sumOfInvalidIds;
}

function isInvalidId(id: number): boolean {
  const idStr = id.toString();
  const idLength = idStr.length;

  const sequence = idStr.substring(0, Math.floor(idLength / 2));
  const secondSequence = idStr.substring(Math.floor(idLength / 2));

  return sequence === secondSequence;
}

export function part2(input: string[]): number {

  let sumOfInvalidIds = 0;

  const ranges = input.join("")
    .split(",")
    .map((range) => range.split("-").map(Number));

  for (const range of ranges) {
    const [start, end] = range;
    for (let id = start; id <= end; id++) {
      if (isInvalidId2(id)) {
        // console.log(`Invalid ID found: ${id} in range ${start}-${end}`);
        sumOfInvalidIds += id;
      }
    }
  }

  return sumOfInvalidIds;
}

function isInvalidId2(id: number): boolean {
  const idStr = id.toString();
  const idLength = idStr.length;

  for (let size = 1; size <= Math.floor(idLength / 2); size++){
    const sequence = idStr.substring(0,size);
    const repetitions = Math.floor(idLength / size);
    let constructed = "";
    for (let r = 0; r < repetitions; r++) {
      constructed += sequence;
    }
    if (constructed === idStr) {
      return true;
    }
  } 

  return false;

}

export default function solve(data: string[]): number {
  console.log("Hello from day 2");

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return data.length;
}
