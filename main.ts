import { getData, getDate, getSolveFn, prepareDayFiles } from "@aoc/utils";
import chalk from "chalk";

if (import.meta.main) {
  const { day, year } = getDate();

  await prepareDayFiles(year, day);
  const data = getData(year, day);
  const solve = await getSolveFn(year, day);

  console.log(chalk.green(`\nDay ${day} of year ${year}!\n`));

  solve(data);
}
