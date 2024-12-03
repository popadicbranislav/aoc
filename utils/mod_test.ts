import { assertEquals } from "@std/assert";
import { expect } from "jsr:@std/expect";
import { getData, getDate, getSolveFn } from "./mod.ts";

Deno.test(function getDayTest() {
  assertEquals(getDate(), {
    day: new Date().getDate().toString().padStart(2, "0"),
    year: new Date().getFullYear() + "",
  });
});

Deno.test(function getDataTest() {
  const data = getData("2024", "sample");
  expect(data).toEqual(["1 2 3 4 5", "a b c d e"]);
});

Deno.test(async function getSolveFnTest() {
  const solve = await getSolveFn("2024", "sample");
  expect(solve).toBeInstanceOf(Function);
});
