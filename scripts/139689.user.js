// ==UserScript==
// @name           ..اسبة نسبة سيطرة القبيلة
// @include        http://ae*.tribalwars.ae/game.php*screen=main*
// ==/UserScript==

var x = prompt("أدخل عدد قرى القبيلة");
var z = prompt ("أدخل عدد قرى العالم");

var t = parseInt(x);
var r = parseInt(z);

var s = (t/0.+r)*100;

alert ("  نسبة السيطرة هي: %" +s);

