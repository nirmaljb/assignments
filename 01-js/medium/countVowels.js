/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    let count = 0
    const transform = str.toLowerCase().split('')

    console.log(transform);

    for(let i = 0; i < transform.length; i++) {
      if(vowels.includes(transform[i])) {
        count++
      }
    }
    // console.log(count);
    return count
}


// countVowels("programming")
module.exports = countVowels;