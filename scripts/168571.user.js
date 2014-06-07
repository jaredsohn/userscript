// ==UserScript==
// @name           Ikariam Extend trade route
// @namespace      Ikariam Extend trade route
// @author         Qwerty Jones
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://happy-snail.webs.com/
// @description    Extends trade route automatically up to 3 years - but only when you are in the port
// @include        http://s*.ikariam.*/index.php*
// @include        http://s*.*.ikariam.*/index.php*
// @version        0.0.1
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
// ==/UserScript==

var stop = false;

if (!stop){  // do stuff if stop is false -- the code will not run if stop==true
var delay = getRandomInt (100, 500);
var interval = setInterval( extension, 3000+delay);
delay = getRandomInt (500, 800); }

function extension(){
try{ var extension = document.evaluate("//span[contains(text(), 'Another')]", document, null, 9, null).singleNodeValue;
var years=extension.innerHTML.replace(/Another (\d+)Y [\S\s]+/,'$1'); // behold the power of mighty reGex!
	if(years<3) { setTimeout( extend_trade_route, delay ); } // extend Trade Route if less that 2 years already.
	else {  window.clearInterval(interval); stop=true; }
}catch(err){};	
}  // eof

function extend_trade_route() {
try{document.evaluate(".//a[@title='extend']", document.body, null, 9, null).singleNodeValue.click();}catch(err){};
} // eof

function getRandomInt (min, max) { // this is the code that gets a random number for random delay
    return Math.floor(Math.random() * (max - min + 1)) + min; }
	