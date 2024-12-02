import { expect } from 'jsr:@std/expect'
import solve from './mod.ts'

Deno.test(function solutionTest() {
  const sampleData = [
    '1 2 3 4 5', 
    'a b c d e'
  ]
  solve(sampleData)
})