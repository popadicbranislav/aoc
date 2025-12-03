import { getData, getDate, getSolveFn, prepareDayFiles } from "@aoc/utils";
import chalk from "chalk";
import { parseArgs } from "jsr:@std/cli/parse-args";

if (import.meta.main) {
  let year: string;
  let day: string;

  const flags = parseArgs(Deno.args, {
    string: ["year", "day"],
  });

  if (flags.year === undefined || flags.day === undefined) {
    const date = getDate();
    year = date.year;
    day = date.day;
  }
  else{
    year = flags.year;
    day = flags.day;
  }


  await prepareDayFiles(year, day);
  const data = getData(year, day);
  const solve = await getSolveFn(year, day);

  console.log(chalk.green(`\nDay ${day} of year ${year}!\n`));

  solve(data);
}
