// Neopoints per game Points
// version 0.52 beta-ish
// 2008-04-07
// Copyright (c) 2007, Sandy Thayer
// Released under the GPL license
// site: http://www.bruk.org - email: cookies@bruk.org
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Neopoints?!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Neopoints?!
// @namespace     http://bruk.org/np
// @description   Shows how many points you must score in game to get 1000 neopoints
// @include       http://neopets.com/games/play.phtml?game_id=*
// @include       http://*.neopets.com/games/play.phtml?game_id=*
// ==/UserScript==

var diff_expl, newElement;
var stuuf= 'stuuf'; 


var testarray = document.evaluate(
     "//a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var test = testarray.iterateNext();

while (test) {
stuuf = test.textContent;
test = testarray.iterateNext();
}

var wth = 'NP Ratio: ';
stuuf = stuuf.replace(wth, '');
var wth = '[?]';
stuuf = stuuf.replace(wth, '');




diff_expl = document.getElementById('diff_expl');

if (diff_expl) {
    newElement = document.createElement("div");
    newElement.innerHTML='<div style="color: #ffffff; background-color: #000000; text-align: center; font-size: 14px; font-weight: bold; margin-bottom: 25px; padding-top: 10px; padding-bottom: 10px;">For 1000 NP, score atleast: ' + 1000/stuuf +  '</div>';
    diff_expl.parentNode.insertBefore(newElement, diff_expl.nextSibling);
}
