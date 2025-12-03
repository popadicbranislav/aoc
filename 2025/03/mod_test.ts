import { expect } from 'jsr:@std/expect'
import { part1, part2 } from "./mod.ts";

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`.split("\n");
// const testInput = `234234234234278`.split("\n");

// Deno.test(function solutionPart1Test() {
//   expect(part1(testInput)).toBe(357);
// });

Deno.test(function solutionPart2Test() {
  expect(part2(testInput)).toBe(3121910778619);
});