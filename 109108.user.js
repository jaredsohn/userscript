// ==UserScript==
// @name           sidhana
// @namespace      flooder
// @include        http://tricksmania.in/peps.htm
// @include        http://openapps.zapak.com/delhihundredyears/services/imagelike.php
// ==/UserScript==

var vvid=Math.floor(Math.random() * (1000000000 - 1000000 + 1)) + 1000000;


if(document.location=="http://tricksmania.in/peps.htm"){
var a=Math.floor(Math.random() * (10000000000 - 1000000 + 1)) + 1000000;
var name=document.getElementById('userid').value=a;
document.forms[0].elements[3].click();
}


if(document.location=="http://openapps.zapak.com/delhihundredyears/services/imagelike.php")
{
document.location="http://tricksmania.in/peps.htm";
}

setTimeout("window.location.reload()", 1);