async function getData() {
  // const text = await Deno.readTextFile('./inputs/sample.txt')
  const text = await Deno.readTextFile("./inputs/input.txt");

  const lines = text.split("\n");
  const listA = [] as number[];
  const listB = [] as number[];
  lines.map((line) => {
    const [a, b] = line.split("   ");
    listA.push(+a);
    listB.push(+b);
  });

  listA.sort((a, b) => a - b);
  listB.sort((a, b) => a - b);

  return [listA, listB];
}

// if (import.meta.main) {
//   const [la, lb] = await getData()

//   console.log(la)
//   console.log(lb)

//     const distances:number[] = []
//   for(let i =0;i<la.length;i++){
//     distances.push(Math.abs(la[i]-lb[i]))
//   }

//   console.log(distances)
//   const sum = distances.reduce((a,b)=>a+b,0)
//   console.log(sum)
// }

function countOccurances(n: number, list: number[]) {
  let count = 0;
  list.forEach((numberInList) => {
    if (numberInList === n) {
      count++;
    }
  });

  return count;
}

if (import.meta.main) {
  const [la, lb] = await getData();

  const similarities = [] as number[];

  la.forEach((a) => {
    similarities.push(a * countOccurances(a, lb));
  });

  const sum = similarities.reduce((a, b) => a + b, 0);

  console.log(sum);
}
