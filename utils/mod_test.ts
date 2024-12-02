import { assertEquals } from "@std/assert";
import { expect } from "jsr:@std/expect";
import { getData, getDay, getSolveFn } from "./mod.ts";

Deno.test(function getDayTest() {
  assertEquals(getDay(), new Date().getDate().toString().padStart(2, "0"));
});

Deno.test(function getDataTest() {
  const data = getData("sample");
  expect(data).toEqual(["1 2 3 4 5", "a b c d e"]);
});

Deno.test(async function getSolveFnTest() {
  const solve = await getSolveFn("sample");
  expect(solve).toBeInstanceOf(Function);
});
