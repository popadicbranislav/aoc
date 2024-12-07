import { expect } from 'jsr:@std/expect'
import { part1, part2 } from "./mod.ts";

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`.split("\n");

Deno.test(function solutionPart1Test() {
  expect(part1(testInput)).toBe(3749);
});

Deno.test(function solutionPart2Test() {
  expect(part2(testInput)).toBe(11387);
});