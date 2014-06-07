// ==UserScript==
// @name        Malones Auto Hyper
// @namespace   MikeyMalone
// @include     http://www.mixify.com/*/live/*
// @version     1
// @grant       none
// ==/UserScript==

/*
This is an auto-hype script for Mixify.com. It will automatically click the hype
button randomly between 10-20 seconds. It will hype any time you are in a room.
*/

console.log("Malone's Mixify Auto-Hype Running at " + window.location.href);

function getRandomInt () {
    return Math.floor ((Math.random () * 10000 ) +10000);
}

function clickHype() {
    $('#hypeButton') .click();
	setTimeout(clickHype, getRandomInt());	
    }
	
setTimeout(clickHype, getRandomInt());	