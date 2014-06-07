// ==UserScript==
// @author        channx
// @name          HDC Freeleech Search
// @namespace     http://hdchina.org/
// @description   Add a Freeleech Search to http://hdchina.org/browse.php
// @include       http://hdchina.org/browse.php*
// @include       http://www.hdchina.org/browse.php*
// ==/UserScript==


var freeleech = document.createElement("span");
var incldead = document.getElementsByName('incldead')[0];
freeleech.innerHTML = '<select name="freeleech"><option value="0">所有种子</option><option value="1">蓝种</option></select>&nbsp;&nbsp;&nbsp;&nbsp;';
if(incldead){
incldead.parentNode.insertBefore(freeleech,incldead);
}