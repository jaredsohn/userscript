// ==UserScript==
// @name           visible
// @namespace      ...
// @include        http://nl*.tribalwars.nl/staemme.php*
// ==/UserScript==

var i = document.getElementsByClassName('center')[1].innerHTML
var i = i.replace(/hidden/g, 'visible');
document.getElementsByClassName('center')[1].innerHTML = i

var i = document.getElementsByClassName('center')[2].innerHTML
var i = i.replace(/hidden/g, 'visible');
document.getElementsByClassName('center')[2].innerHTML = i

var i = document.getElementsByClassName('center')[4].innerHTML
var i = i.replace(/hidden/g, 'visible');
document.getElementsByClassName('center')[4].innerHTML = i

var i = document.getElementsByClassName('center')[5].innerHTML
var i = i.replace(/hidden/g, 'visible');
document.getElementsByClassName('center')[5].innerHTML = i