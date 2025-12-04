type Position = {
  x: number;
  y: number;
};

export function part1(input: string[]): number {
  const map = input.map((line) => line.split(""));

  let accessibleRolls = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      const pos: Position = { x, y };
      if (map[y][x] !== "@") continue;
      const matches = checkAround(map, pos, "@");

      if (matches.length < 4) {
        accessibleRolls++;
      }
    }
  }
  return accessibleRolls;
}

function checkAround(
  map: string[][],
  pos: Position,
  symbol: string,
): Position[] {
  const foundMatches: Position[] = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const x = pos.x + i;
      const y = pos.y + j;

      if (x < 0 || y < 0 || y >= map.length || x >= map[0].length) continue;

      if (map[y][x] === symbol) {
        foundMatches.push({ x, y });
      }
    }
  }
  return foundMatches;
}

export function part2(input: string[]): number {
  let map = input.map((line) => line.split(""));

  let removedPositions = 0;

  while (true) {
    const rem = findAccessible(map);
    // console.log('Accessible positions to remove:', rem.size);
    if (rem.size === 0) break;

    removedPositions += rem.size;
    map = updateMap(map, rem);

    // console.log("Updated map:");
    // for (const line of map) {
    //   console.log(line.join(""));
    // }
    // console.log('\n')
  }

  return removedPositions;
}

function findAccessible(map: string[][]): Set<Position> {
  const accessiblePositions = new Set<Position>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      const pos: Position = { x, y };
      if (map[y][x] !== "@") continue;
      const matches = checkAround(map, pos, "@");

      if (matches.length < 4) {
        accessiblePositions.add(pos);
      }
    }
  }
  return accessiblePositions;
}

function updateMap(
  sourceMap: string[][],
  positionsToRemove: Set<Position>,
): string[][] {
  const updatedMap: string[][] = sourceMap.map((line) => [...line]);

  positionsToRemove.forEach(({ x, y }) => {
    updatedMap[y][x] = "x";
  });
  return updatedMap;
}

export default function solve(data: string[]): number {
  console.log("Hello from day 04");

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return data.length;
}
