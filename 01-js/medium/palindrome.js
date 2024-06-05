/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const cleanString = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  const reversed = cleanString.split('').reverse().join('')

  // console.log(cleanString, reversed);
  return cleanString === reversed
}

// isPalindrome("Able, was I ere I saw Elba!")

module.exports = isPalindrome;
