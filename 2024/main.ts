import {
  getDay,
  getData,
  getSolveFn,
  prepareDayFiles,
} from '@aoc/utils'
import chalk from 'chalk'

if (import.meta.main) {

  const day = getDay()

  await prepareDayFiles(day)
  const data = getData(day)
  const solve = await getSolveFn(day)

  console.log(chalk.green(`Solving day ${day}!`))

  solve(data)
}
