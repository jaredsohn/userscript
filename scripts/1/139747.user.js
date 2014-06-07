// ==UserScript==
// @name           حار
// @include        http://ae*.tribalwars.ae/game.php*screen=main*
// ==/UserScript==

var x = prompt("أدخل عدد قرى القبيلة");
var z = prompt ("أدخل عدد قرى العالم");

var t = parseFloat(x);
var r = parseFloat(z);

var s = (x/z)*100;

alert ("  نسبة السيطرة هي: %" +s);