import chalk from "npm:chalk@5.6.2";

const guard = new RegExp(/\^|>|<|v/);

function isInBounds(map: string[][], [x, y]: [number, number]): boolean {
  if (x < 0 || y < 0) return false;

  if (x >= map[0].length || y >= map.length) return false;

  return true;
}

function getNextOrientation(current: string): string {
  switch (current) {
    case "^":
      return ">";
    case "v":
      return "<";
    case ">":
      return "v";
    case "<":
      return "^";

    default:
      throw new Error("Unknown guard character. Cannot find next orientation");
  }
}

function getDiff(orientation: string): [number, number] {
  switch (orientation) {
    case "^":
      return [0, -1];
    case "v":
      return [0, 1];
    case ">":
      return [1, 0];
    case "<":
      return [-1, 0];

    default:
      throw new Error("Unknown guard character. Cannot find next step");
  }
}

// function sleep(duration: number): Promise<void> {
//   return new Promise((res) => {
//     setTimeout(res, duration);
//   });
// }

// export async function part1(map: string[][]) {
export function part1(map: string[][]) {
  const startTime = Date.now();
  console.log("Starting part1");

  // ^ | > | v | < - guard
  // . - not visited
  // # - obstacle (turn right)
  // x - visited

  let guardPosition: [number, number] = [-1, -1]; // [x,y]
  let guardOrientation = "";

  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      const m = row[j].match(guard);

      if (m) {
        guardPosition = [j, i];
        guardOrientation = m[0];
      }
    }
  }

  while (isInBounds(map, guardPosition)) {
    const x = guardPosition[0];
    const y = guardPosition[1];

    // map[y][x] = chalk.bgBlue('x')
    map[y][x] = "x";

    let diff = getDiff(guardOrientation);
    let nextPos: [number, number] = [x + diff[0], y + diff[1]];
    let nextTile = map[nextPos[1]]?.[nextPos[0]];

    while (nextTile === "#") {
      guardOrientation = getNextOrientation(guardOrientation);

      diff = getDiff(guardOrientation);
      nextPos = [x + diff[0], y + diff[1]];
      nextTile = map[nextPos[1]][nextPos[0]];
    }

    guardPosition = nextPos;
    if (isInBounds(map, guardPosition)) {
      // map[guardPosition[1]][guardPosition[0]] = chalk.bgYellowBright(chalk.red(guardOrientation))
      map[guardPosition[1]][guardPosition[0]] = guardOrientation;
    }

    // await sleep(10)
    // console.clear()
    // console.log(map.map(r => r.join('')).join('\n'))
  }

  // console.log(map.map(r => r.join('')).join('\n'))

  console.log("part1: ", map.flat().filter((ch) => ch === "x").length);

  console.log(`time elapsed: ${Date.now() - startTime}`);
  return map.flat().filter((ch) => ch === "x").length;
}

// export async function part2(originalMap: string[][]) {
export function part2(originalMap: string[][]) {
  const startTime = Date.now();
  console.log("Starting part2");
  let obstaclePlacementCount = 0;

  // let pass = 0
  // const total = originalMap.length * originalMap[0].length
  for (let row = 0; row < originalMap.length; row++) {
    for (let col = 0; col < originalMap.length; col++) {
      // console.clear()
      // console.log(`approx ${++pass}/${total}, useful obstacles found: ${obstaclePlacementCount}`)

      const map = originalMap.map((r) => [...r]);

      if (map[row][col] !== ".") continue;

      map[row][col] = "#";

      // ^ | > | v | < - guard
      // . - not visited
      // # - obstacle (turn right)
      // x - visited

      let guardPosition: [number, number] = [-1, -1]; // [x,y]
      let guardOrientation = "";

      for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
          const m = row[j].match(guard);

          if (m) {
            guardPosition = [j, i];
            guardOrientation = m[0];
          }
        }
      }

      const visits: string[] = [];

      while (isInBounds(map, guardPosition)) {
        const x = guardPosition[0];
        const y = guardPosition[1];

        const visit = `${x}-${y}-${guardOrientation}`;
        if (visits.includes(visit)) {
          // console.log('found loop')
          obstaclePlacementCount++;
          break;
        }

        visits.push(visit);

        map[y][x] = chalk.bgBlue("x");
        // map[y][x] = 'x'

        let diff = getDiff(guardOrientation);
        let nextPos: [number, number] = [x + diff[0], y + diff[1]];
        let nextTile = map[nextPos[1]]?.[nextPos[0]];

        while (nextTile === "#") {
          guardOrientation = getNextOrientation(guardOrientation);

          diff = getDiff(guardOrientation);
          nextPos = [x + diff[0], y + diff[1]];
          nextTile = map[nextPos[1]][nextPos[0]];
        }

        guardPosition = nextPos;
        if (isInBounds(map, guardPosition)) {
          map[guardPosition[1]][guardPosition[0]] = chalk.bgYellowBright(
            chalk.red(guardOrientation),
          );
          // map[guardPosition[1]][guardPosition[0]] = guardOrientation
        }

        // await sleep(10)
        // console.clear()
        // console.log('count: ' + obstaclePlacementCount)
        // console.log(map.map(r => r.join('')).join('\n'))
      }

      // await sleep(1000)
      // console.log(map.map(r => r.join('')).join('\n'))
    }
  }

  console.log(`part2 - ${obstaclePlacementCount}`);
  console.log(`time elapsed: ${Date.now() - startTime}`);
  return obstaclePlacementCount;
}

export default function solve(data: string[]): number {
  part1(data.map((r) => r.split("")));
  part2(data.map((r) => r.split("")));

  return 0;
}
