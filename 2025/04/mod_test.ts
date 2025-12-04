import { expect } from 'jsr:@std/expect'
import { part1, part2 } from "./mod.ts";

const testInput = 
`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.split("\n");

Deno.test(function solutionPart1Test() {
  expect(part1(testInput)).toBe(13);
});

Deno.test(function solutionPart2Test() {
  expect(part2(testInput)).toBe(43);
});