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
......#...`.split("\n")

Deno.test(function solutionPart1Test() {
  // expect(part1(sampleData.map((r)=> r.split("")))).toBe(41);
});

Deno.test(function solutionPart2Test() {
  // expect(part2(sampleData.map(r=> r.split("")))).toBe(6);
});
