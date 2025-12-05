export function part1(input: string): number {
  const { ranges, ids } = parseInput(input);

  let freshIds = 0;
  ids.forEach((id) => {
    for (const range of ranges) {
      if (id >= range[0] && id <= range[1]) {
        freshIds++;
        return;
      }
    }
  });

  return freshIds;
}

type ParsedInput = {
  ranges: Array<[number, number]>;
  ids: number[];
};

function parseInput(input: string): ParsedInput {
  const [rangesRaw, idsRaw] = input.split("\n\n");

  const ranges = rangesRaw.split("\n").map((r) =>
    r.split("-").map((v) => +v) as [number, number]
  );
  const ids = idsRaw.split("\n").map((id) => +id);

  return { ranges, ids };
}

export function part2(input: string): number {
  let { ranges } = parseInput(input);

  while (true) {
    const sorted = sortRanges(ranges);
    ranges = removeOverlap(sorted);
    
    if (sorted.length === ranges.length) {
      break;
    }
  }

  let total = 0;
  for (const range of ranges) {
    total += range[1] - range[0] + 1;
  }

  return total;
}

function sortRanges(ranges: Array<[number, number]>): Array<[number, number]> {
  const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

  return sortedRanges;
}

function removeOverlap(
  ranges: Array<[number, number]>,
): Array<[number, number]> {
  const newRanges = [] as Array<[number, number]>;

  for (let i = 0; i < ranges.length; i++) {
    const thisRange = ranges[i];
    const nextRange = ranges[i + 1];

    const start = thisRange[0];
    let end = thisRange[1];
    if (!nextRange) {
      newRanges.push([start, end]);
      break;
    }
    const nextStart = nextRange[0];
    const nextEnd = nextRange[1];

    if (
      nextStart <= end
    ) {
      if (end >= nextEnd) {
        i++; // skip
      } else {
        end = nextStart - 1;
      }
    }

    if (start <= end) {
      newRanges.push([start, end]);
    }
  }

  return newRanges;
}

export default function solve(data: string[]): number {
  console.log("Hello from day 05");

  const data2 = data.join("\n");

  console.log("Result part1: ", part1(data2));
  console.log("Result part2: ", part2(data2));

  return data.length;
}
