import { expect } from 'jsr:@std/expect'
import { part1, part2 } from "./mod.ts";

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`.split("\n");

Deno.test(function solutionPart1Test() {
  expect(part1(testInput)).toBe(4277556);
});

Deno.test.only(function solutionPart2Test() {
  expect(part2(testInput)).toBe(3263827);
});