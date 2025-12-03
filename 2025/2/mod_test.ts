import { expect } from 'jsr:@std/expect'
import { part1, part2 } from "./mod.ts";

const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`.split("\n");

Deno.test(function solutionPart1Test() {
  expect(part1(testInput)).toBe(0);
});

Deno.test(function solutionPart2Test() {
  expect(part2(testInput)).toBe(0);
});