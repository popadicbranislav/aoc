function calculateMiddleValueSum(lists: string[][]): number {
  return lists.map((u) => +u[Math.floor(u.length / 2)]).reduce(
    (a, b) => a + b,
    0,
  );
}

export function part1(data: string) {
  const [rulesRaw, updatesRaw] = data.split("\n\n");

  const rules = rulesRaw.split("\n").map((rule) => rule.split("|"));
  const updates = updatesRaw.split("\n").map((update) => update.split(","));

  const correctUpdates: typeof updates = [];

  updates.forEach((update) => {
    let updateCorrect = true;

    for (let i = 0; i < update.length; i++) {
      const page = update[i];

      let pageCorrect = true;

      const rulesApplied = rules.filter((r) => r.includes(page));

      rulesApplied.forEach((rule) => {
        if (
          (rule[0] === page && update.includes(rule[1]) &&
            !update.slice(i + 1).includes(rule[1])) ||
          (rule[1] === page && update.includes(rule[0]) &&
            !update.slice(0, i).includes(rule[0]))
        ) {
          pageCorrect = false;
        }
      });

      if (!pageCorrect) {
        updateCorrect = false;
      }
    }

    if (updateCorrect) correctUpdates.push(update);
  });

  const middleValueSum = calculateMiddleValueSum(correctUpdates);

  // console.log('correct updates: ', correctUpdates)
  console.log(middleValueSum);

  return middleValueSum;
}

export function part2(data: string) {
  const [rulesRaw, updatesRaw] = data.split("\n\n");

  const rules = rulesRaw.split("\n").map((rule) => rule.split("|"));
  const updates = updatesRaw.split("\n").map((update) => update.split(","));

  const incorrectUpdates: typeof updates = [];

  updates.forEach((update) => {
    let updateCorrect = true;

    for (let i = 0; i < update.length; i++) {
      const page = update[i];

      let pageCorrect = true;

      const rulesApplied = rules.filter((r) => r.includes(page));

      rulesApplied.forEach((rule) => {
        if (
          (rule[0] === page && update.includes(rule[1]) &&
            !update.slice(i + 1).includes(rule[1])) ||
          (rule[1] === page && update.includes(rule[0]) &&
            !update.slice(0, i).includes(rule[0]))
        ) {
          pageCorrect = false;
        }
      });

      if (!pageCorrect) {
        updateCorrect = false;
      }
    }

    if (!updateCorrect) incorrectUpdates.push(update);
  });

  const correctedUpdates = incorrectUpdates.map((update) => {
    return update.sort((a, b) => {
      const testRules = rules.filter((r) => r.includes(a) && r.includes(b));

      if (testRules.length === 0) return 0;

      return testRules[0].indexOf(a) - testRules[0].indexOf(b);
    });
  });

  return calculateMiddleValueSum(correctedUpdates);
}

export default function solve(data: string[]): number {
  const input = data.join("\n");

  console.log(`part1: ${part1(input)}`);
  console.log(`part2: ${part2(input)}`);

  return 0;
}
