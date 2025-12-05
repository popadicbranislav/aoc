import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./mod.ts";

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.split("\n");

Deno.test(function solutionPart1Test() {
  expect(part1(testInput)).toBe(3);
});

Deno.test(function solutionPart2Test() {
  expect(part2(testInput)).toBe(6);
});
