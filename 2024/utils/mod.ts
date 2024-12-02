import { assert } from "@std/assert/assert";
import { resolve } from 'jsr:@std/path'
import { ensureFileSync } from "jsr:@std/fs/ensure-file";
import { existsSync } from "jsr:@std/fs";

export function getDay() {
  const dayNumber = Deno.args[0] || new Date().getDate()
  return dayNumber.toString().padStart(2, '0')
}

export function getData(day: string): string[] {
  const path = resolve(Deno.cwd(), `./days/${day}/inputs/input.txt`)
  const input = Deno.readTextFileSync(path)
  return input.split('\n')
}

export async function getSolveFn(day: string) {
  const path = resolve(Deno.cwd(), `./days/${day}/mod.ts`)
  const solveFn = (await import(path)).default as (data: string[]) => void
  assert(typeof solveFn === 'function', 'Imported module does not have a default function')

  return solveFn
}

export async function prepareDayFiles(day: string) {

  if (!existsSync(`./days/${day}`)) {
    const {code}= await (new Deno.Command(Deno.execPath(), { args: ['init', `days/${day}`, '--lib'] })).output()
    if (code !== 0) {
      console.error('Failed to create day directory')
      Deno.exit(1)
    }
    ensureFileSync(`./days/${day}/inputs/input.txt`)
    ensureFileSync(`./days/${day}/README.md`)
    Deno.writeTextFileSync(`./days/${day}/mod.ts`,
      `export default function solve(data: string[]) {
  console.log('hello from day ${day}', data)
}`)
    Deno.writeTextFileSync(`./days/${day}/mod_test.ts`,
      `import { expect } from 'jsr:@std/expect'
import solve from './mod.ts'

Deno.test(function solutionTest() {
  const sampleData = [
    '1 2 3 4 5', 
    'a b c d e'
  ]
  solve(sampleData)
})`)
  }
}