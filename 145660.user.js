// ==UserScript==
// @name        Google Voice Mobile Character Counter
// @namespace   http://www.infinemesis.com/scripts
// @description Displays a character counter on the Google Voice mobile site.
// @include     https://www.google.com/voice/m/*
// @version     1.0
// ==/UserScript==

var counter= document.createElement('span');
var txtbox = document.getElementsByName('smstext');
txtbox[0].parentNode.insertBefore(counter,txtbox[0].nextSibling);
counter.innerHTML="<br />"+"<b>"+(160-txtbox[0].value.length)+"</b> characters remaining";
document.onkeyup=function(event){
	counter.innerHTML="<br />"+"<b>"+(160-txtbox[0].value.length)+"</b> characters remaining";
}
