// ==UserScript==
// @name           shreylodu
// @namespace      shreylodu
// @include        http://tricksdesk.com/abc.html
// @include        http://openapps.zapak.com/delhihundredyears/services/imagelike.php
// ==/UserScript==

if(document.location=="http://tricksdesk.com/abc.html"){

var a=Math.floor(Math.random() * (10000000000 - 1000000 + 1)) + 10000000;
var name=document.getElementById('user').value=a;
}