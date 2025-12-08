type Position = {
  x: number;
  y: number;
  z: number;
};

const cache = new Map<string, number>();

function getDistance(a: Position, b: Position): number {
  const key = `${a.x},${a.y},${a.z}-${b.x},${b.y},${b.z}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }
  const distance = Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2),
  );
  cache.set(key, distance);
  return distance;
}

class Circuit {
  positions: Position[];

  constructor(positions: Position[]) {
    this.positions = positions;
  }

  contains(position: Position): boolean {
    return this.positions.some(
      (p) => p.x === position.x && p.y === position.y && p.z === position.z,
    );
  }

  merge(other: Circuit): void {
    this.positions = Array.from(
      new Set([...this.positions, ...other.positions]),
    );
  }

  add(position: Position): void {
    if (this.contains(position)) return;
    this.positions.push(position);
  }
}

export function part1(input: string[]): number {
  const positions: Position[] = input.map((l) => l.split(",").map(Number)).map((
    [x, y, z],
  ) => ({ x, y, z }));

  const distances: Record<string, { a: Position; b: Position }> = {};

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dist = getDistance(positions[i], positions[j]);
      distances[dist] = { a: positions[i], b: positions[j] };
    }
  }

  const sortedDistances = Object.keys(distances).map(Number).sort((a, b) =>
    a - b
  );

  const NUMBER_OF_PASSES = 1000;
  let pass = 0;
  let circuits: Circuit[] = [];

  for (const dist of sortedDistances) {
    if (pass >= NUMBER_OF_PASSES) break;

    pass++;
    const { a, b } = distances[dist];

    const circuitA = circuits.find((c) => c.contains(a));
    const circuitB = circuits.find((c) => c.contains(b));

    if (circuitA && circuitB && circuitA !== circuitB) {
      circuitA.merge(circuitB);
      circuits = circuits.filter((c) => c !== circuitB);
    } else if (circuitA) {
      circuitA.add(b);
    } else if (circuitB) {
      circuitB.add(a);
    } else {
      circuits.push(new Circuit([a, b]));
    }
  }

  const sortedCircuits = circuits.sort((a, b) =>
    b.positions.length - a.positions.length
  );
  // console.log(sortedCircuits);

  const res = sortedCircuits.slice(0, 3).reduce(
    (acc, curr) => acc * curr.positions.length,
    1,
  );

  return res;
}

export function part2(input: string[]): number {
  const positions: Position[] = input.map((l) => l.split(",").map(Number)).map((
    [x, y, z],
  ) => ({ x, y, z }));

  const distances: Record<string, { a: Position; b: Position }> = {};

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dist = getDistance(positions[i], positions[j]);
      distances[dist] = { a: positions[i], b: positions[j] };
    }
  }

  const sortedDistances = Object.keys(distances).map(Number).sort((a, b) =>
    a - b
  );

  let circuits: Circuit[] = [];

  let lastPositions: [Position, Position] | null = null;

  for (const dist of sortedDistances) {
    if (
      circuits.length === 1 && circuits.at(0)!.positions.length === input.length
    ) break;

    const { a, b } = distances[dist];

    const circuitA = circuits.find((c) => c.contains(a));
    const circuitB = circuits.find((c) => c.contains(b));

    if (circuitA && circuitB && circuitA !== circuitB) {
      circuitA.merge(circuitB);
      circuits = circuits.filter((c) => c !== circuitB);
    } else if (circuitA) {
      circuitA.add(b);
    } else if (circuitB) {
      circuitB.add(a);
    } else {
      circuits.push(new Circuit([a, b]));
    }

    lastPositions = [a, b];
  }

  if (lastPositions) {
    return lastPositions[0].x * lastPositions[1].x;
  }

  return 0;
}

export default function solve(data: string[]): number {
  console.log("Hello from day 08");

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return data.length;
}
