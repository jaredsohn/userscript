// ==UserScript==
// @name            Yahoo Random Word
// @description	    Timer 
// @namespace       JamesTodd
// @name            Timer
// ==/UserScript==

setTimeout(openUrl, 1000); // Wait 1 seconds

function openUrl(){

   window.open('http://uk.search.yahoo.com/search?ourmark=1&ei=utf-8&fr=nectar-tb-v4&type=&cuid=&p='+CreateRandomWord(10));

}

function CreateRandomWord(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz',
        vowels = 'aeiou',
        rand = function (limit) {
            return Math.floor(Math.random() * limit);
        },
        i, word = '',
        length = parseInt(length, 10),
        consonants = consonants.split(''),
        vowels = vowels.split('');
    for (i = 0; i < length / 2; i++) {
        var randConsonant = consonants[rand(consonants.length)],
            randVowel = vowels[rand(vowels.length)];
        word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
        word += i * 2 < length - 1 ? randVowel : '';
    }
    return word;
}