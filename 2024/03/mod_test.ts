import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./mod.ts";

Deno.test(function part1Test() {
  const sampleData =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

  expect(part1(sampleData)).toBe(161);
});

Deno.test(function part2Test() {
  const sampleData =
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

  expect(part2(sampleData)).toBe(48);
});
