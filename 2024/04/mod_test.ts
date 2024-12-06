import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./mod.ts";

Deno.test(function part1Test() {
  const sampleData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split("\n");

  expect(part1(sampleData)).toBe(18);
});

Deno.test(function part2Test() {
  const sampleData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split("\n");

  expect(part2(sampleData)).toBe(9);
});
