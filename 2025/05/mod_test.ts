import { expect } from "jsr:@std/expect@1.0.17";
import { part1, part2 } from "./mod.ts";

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

Deno.test(function solutionPart1Test() {
  expect(part1(testInput)).toBe(3);
});

Deno.test(function solutionPart2Test() {
  expect(part2(testInput)).toBe(14);
});
