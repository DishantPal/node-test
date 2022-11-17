const express = require("express");
const app = express();
const port = 3000;

const MAX_RANGE = 10000;


const prime_factors = (num) => {
    function is_prime(num) {
      for (let i = 2; i <= Math.sqrt(num); i++)
      {
        if (num % i === 0) return false;
      }
      return true;
    }
    const result = [];
    for (let i = 2; i <= num; i++)
    {
      while (is_prime(i) && num % i === 0) 
      {
        if (!result.includes(i)) result.push(i);
        num /= i;
      }
    }
    return result;
  }

  
function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
 }

app.get("/:slug", async (req, res) => {
    await sleep((Math.random() + 2));
    const num = Math.floor(Math.random()*MAX_RANGE)
    
    let start = process.hrtime()
    const primes = prime_factors(num)
    let end = process.hrtime(start)

    res.send({
        message: "success",
        number: num,
        primes: primes,
        timeTaken: end,
        slug: req.params.slug
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});