import { assert } from "@std/assert/assert";
import { resolve } from "jsr:@std/path";
import { ensureFileSync } from "jsr:@std/fs/ensure-file";
import { existsSync } from "jsr:@std/fs";

export function getDate() {
  const dayNumber = Deno.args[0] || new Date().getDate();
  const year = Deno.args[1] || new Date().getFullYear() + "";
  return {
    day: dayNumber.toString().padStart(2, "0"),
    year,
  };
}

export function getData(year: string, day: string): string[] {
  const path = resolve(Deno.cwd(), `./${year}/${day}/inputs/input.txt`);
  const input = Deno.readTextFileSync(path);
  return input.split("\n");
}

export async function getSolveFn(year: string, day: string) {
  const path = resolve(Deno.cwd(), `./${year}/${day}/mod.ts`);
  const solveFn = (await import(path)).default as (data: string[]) => void;
  assert(
    typeof solveFn === "function",
    "Imported module does not have a default function",
  );

  return solveFn;
}

export async function prepareDayFiles(year: string, day: string) {
  if (!existsSync(`./${year}/${day}`)) {
    const { code } = await (new Deno.Command(Deno.execPath(), {
      args: ["init", `${year}/${day}`, "--lib"],
    })).output();
    if (code !== 0) {
      console.error("Failed to create day directory");
      Deno.exit(1);
    }
    ensureFileSync(`./${year}/${day}/inputs/input.txt`);
    ensureFileSync(`./${year}/${day}/README.md`);
    Deno.writeTextFileSync(
      `./${year}/${day}/mod.ts`,
      `export default function solve(data: string[]): number {
  console.log('hello from day ${day}', data);

  return data.length;
}`,
    );
    Deno.writeTextFileSync(
      `./${year}/${day}/mod_test.ts`,
      `import { expect } from 'jsr:@std/expect'
import solve from './mod.ts'

Deno.test(function solutionTest() {
  const sampleData = [
    '1 2 3 4 5', 
    'a b c d e'
  ]
  expect(solve(sampleData)).toBe(2)
})`,
    );
  }
}
