// ==UserScript==
// @name           Anon
// @description    Anon
// @include        *
// ==/UserScript==

var count = 0;

var limit = 0;
 

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
 

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.onkeypress = function (e) {
    count++;
    limit = getRandomInt(50,100);
    if (count > limit)
    {
        count = 0;
 
        //get the element that is currently being typed into, then append the random character.
        document.activeElement.value = document.activeElement.value + alphabet.charAt(getRandomInt(0, 25));
    }
};