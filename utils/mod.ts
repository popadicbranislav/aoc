import { assert } from "@std/assert/assert";
import { resolve } from "jsr:@std/path";
import { ensureFileSync } from "jsr:@std/fs/ensure-file";
import { existsSync } from "jsr:@std/fs";

export function getDate(): { day: string; year: string } {
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

export async function getSolveFn(
  year: string,
  day: string,
): Promise<(data: string[]) => void> {
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
      `export function part1(input: string[]): number {
  return input.length;
}

export function part2(input: string[]): number {
  return input.length;
}

export default function solve(data: string[]): number {
  console.log('Hello from day ${day}');

  console.log("Result part1: ", part1(data));
  console.log("Result part2: ", part2(data));

  return data.length;
}`,
    );
    Deno.writeTextFileSync(
      `./${year}/${day}/mod_test.ts`,
      `import { expect } from 'jsr:@std/expect'
import { part1, part2 } from "./mod.ts";

const testInput = \`123
456
789\`.split("\\n");

Deno.test(function solutionPart1Test() {
  expect(part1(testInput)).toBe(0);
});

Deno.test(function solutionPart2Test() {
  expect(part2(testInput)).toBe(0);
});`,
    );
  }
}
