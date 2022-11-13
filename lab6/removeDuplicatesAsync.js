async function removeDuplicates(list) {
  return [...new Set(list)];
}

Array.prototype.removeDuplicatesAsync = async function () {
  let list = this;
  let value = await removeDuplicates(list);
  console.log(value)
  return value;
};

console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);

// Output:
// start
// end
// [4, 1, 5, 7, 2, 3, 6]

//regular for loop

// let list = [];
// function removeDuplicatesAsync(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (list.includes(arr[i])) {
//       continue;
//     } else {
//       list.push(arr[i]);
//     }
//   }
// }
// let arr = [4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2];
// removeDuplicatesAsync(arr);
// console.log(list);
