// ==UserScript==
// @name           click
// @namespace      clicks the button to get daily bonus after a random delay
// @author         TestUser
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/50784
// @description    Removes Plus features as a test - I am not against paying to play
// @include        http://s*.ikariam.*/index.php*
// @include        http://s*.*.ikariam.*/index.php*
// @version        0.02
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
// ==/UserScript==


// this is the code that gets a random number for delay - between 500 and 1500 miliseconds.
var delay = getRandomInt (500, 1500);
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var btn = document.getElementsByClassName("button okButton")[0]; // gets all buttons by this class name - there should be only one
// this is the code that activates clicking of a button  after a random delay
if ( btn )  {  //  only runs on the first page load - when there is the button we want to click
setTimeout( click_it, delay );
}

// this is the code that actually clicks the button
function click_it() {   
document.evaluate("//input[@value='Confirm' and @type='submit' and contains(@class, 'button okButton')]", document, null, 9, null).singleNodeValue.click();
}
