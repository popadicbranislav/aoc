type Position = {
  x: number;
  y: number;
};

const movementVectors: Record<string, Position> = {
  "N": { x: 0, y: -1 },
  "NE": { x: +1, y: -1 },
  "E": { x: +1, y: 0 },
  "SE": { x: +1, y: +1 },
  "S": { x: 0, y: +1 },
  "SW": { x: -1, y: +1 },
  "W": { x: -1, y: 0 },
  "NW": { x: -1, y: -1 },
};

function searchWord(
  rows: string[],
  dir: string,
  targetWord: string,
  currentCharIndex: number,
  { x, y }: Position,
): number {
  let wordsFound = 0;

  const charToCheck = rows[y] ? rows[y][x] : undefined;
  const charToFind = targetWord[currentCharIndex];

  if (charToCheck === undefined || charToFind === undefined) {
    return 0;
  }

  if (charToCheck !== charToFind) {
    return 0;
  }

  if (
    targetWord.length - 1 === currentCharIndex && charToCheck === charToFind
  ) {
    return 1;
  }

  const nextPosition = {
    x: x + movementVectors[dir].x,
    y: y + movementVectors[dir].y,
  };

  wordsFound += searchWord(
    rows,
    dir,
    targetWord,
    currentCharIndex + 1,
    nextPosition,
  );

  return wordsFound;
}

export function part1(data: string[]) {
  let wordCount = 0;

  for (let y = 0; y < data.length; y++) {
    const line = data[y];
    for (let x = 0; x < line.length; x++) {
      const currentPosition: Position = { x, y };

      Object.keys(movementVectors).forEach((dir) => {
        const wordIndex = 0;
        wordCount += searchWord(data, dir, "XMAS", wordIndex, currentPosition);
      });
    }
  }

  return wordCount;
}

export function part2(data: string[]) {
  let xmasCount = 0;

  for (let y = 0; y < data.length; y++) {
    const line = data[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];

      if (char !== "A") {
        continue;
      }

      // check diagonal from SW to NE
      let diagonalSWtoNE = false;
      const posNE = {
        x: x + movementVectors["NE"].x,
        y: y + movementVectors["NE"].y,
      };
      const posSW = {
        x: x + movementVectors["SW"].x,
        y: y + movementVectors["SW"].y,
      };
      const chNE = data[posNE.y] ? data[posNE.y][posNE.x] : undefined;
      const chSW = data[posSW.y] ? data[posSW.y][posSW.x] : undefined;

      if (chNE === undefined || chSW === undefined) {
        continue;
      }

      const wordA = chNE + char + chSW;
      if (wordA === "MAS" || wordA === "SAM") {
        diagonalSWtoNE = true;
      }

      // check diagonal from NW to SE
      let diagonalNWtoSE = false;
      const posNW = {
        x: x + movementVectors["NW"].x,
        y: y + movementVectors["NW"].y,
      };
      const posSE = {
        x: x + movementVectors["SE"].x,
        y: y + movementVectors["SE"].y,
      };
      const chNW = data[posNW.y] ? data[posNW.y][posNW.x] : undefined;
      const chSE = data[posSE.y] ? data[posSE.y][posSE.x] : undefined;

      if (chNW === undefined || chSE === undefined) {
        continue;
      }

      const wordB = chNW + char + chSE;
      if (wordB === "MAS" || wordB === "SAM") {
        diagonalNWtoSE = true;
      }

      if (diagonalNWtoSE && diagonalSWtoNE) {
        xmasCount++;
      }
    }
  }

  return xmasCount;
}

export default function solve(data: string[]): number {
  console.log(`Part 1: ${part1(data)}`);
  console.log(`Part 2: ${part2(data)}`);

  return 0;
}
