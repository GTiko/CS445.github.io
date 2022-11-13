const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) {
      return new Promise((resolve, reject) => {
        setTimeout( ()=>{reject({ prime: false });}, 500);
      });
    }
  return new Promise((resolve, reject) => {
    setTimeout(()=> {resolve({ prime: true });}, 500);
  });
};

console.log("start");
isPrime(7)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
console.log("end");

// Output:
// start
// end
// { prime: true }
