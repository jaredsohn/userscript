// ==UserScript==
// @name           AutoTripcode
// @description    Generates a random name and tripcode for every post
// @include        http://*.4chan.org/*
// ==/UserScript==
function createRandomWord(length) {
var consonants = 'bcdfghjklmnpqrstvwxyz',
vowels = 'aeiou',
rand = function(limit) {
return Math.floor(Math.random()*limit);
},
i, word='', length = parseInt(length,10),
consonants = consonants.split(''),
vowels = vowels.split('');
for (i=0;i<length/2;i++) {
var randConsonant = consonants[rand(consonants.length)],
randVowel = vowels[rand(vowels.length)];
word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
word += i*2<length-1 ? randVowel : '';
}
return word;
}
document.getElementsByName("name")[0].value = createRandomWord(10) + "#" + createRandomWord(8);