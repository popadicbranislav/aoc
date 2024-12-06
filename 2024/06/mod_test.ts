import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./mod.ts";

const sampleData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.split("\n").map((r) => r.split(""));

Deno.test(async function solutionPart1Test() {
  expect(await part1(sampleData)).toBe(41);
});

Deno.test(async function solutionPart2Test() {
  expect(await part2(sampleData)).toBe(6);
});
