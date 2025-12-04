# Advent of Code

This repository contains my solutions to the Advent of Code challenges. Each year is organized into its own directory, with individual modules for each day's challenge.

## Prerequisites

Make sure you have Deno installed. You can download it from [deno.land](https://deno.land/).

## Running the Solutions

To execute the solution for a current day, run the following command in your terminal:

```bash
deno run dev
```

This will generate the input file, code and test scaffolding for the current day's challenge if they do not already exist, and then execute the solution in a watch mode.

To run a specific day's solution, use the `--day` and `--year` flags:

```bash
deno run dev --day=1 --year=2025
```

## Testing

The scaffolding includes test files for each day's module. You can run the tests using Deno's testing capabilities:

```bash
deno run test
```

The `mod_test.ts` files contain a snippet of example input data you can update based on the challenge description.
