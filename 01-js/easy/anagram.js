/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // const a = new Set(str1.toLowerCase())
  // const b = new Set(str2.toLowerCase())
  // return a.size === b.size && [...a].every((x) => b.has(x))
  const x = str1.toLowerCase().split('').sort().join('').trim()
  const y = str2.toLowerCase().split('').sort().join('').trim()

  return x === y
}

module.exports = isAnagram;
