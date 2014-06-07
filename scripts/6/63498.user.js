// ==UserScript==
// @author		  ROBOT BOY
// @name          Travian Signature for Messages UPDATED
// @namespace     http://userscripts.org/
// @description   This Script Will Automatically Create signature to your Messages.
// @include       http://*.travian.*/nachrichten.php
// @include       http://*.travian*.*/nachrichten.php?t=1
// @include       http://*.travian*.*/nachrichten.php?t=1&id=*
// @version		  2.001
// ==/UserScript==
//Any problems then message me at 70.cyborg.07@gmail.com


// EDIT THIS "in the cotes":
var greet="Hello "
var regards="Regards,"
var sig = "YOURNAMEHERE"
//TILL HERE


var message = document.getElementById('message');

if (message) {
	message.innerHTML = "\n"+greet+"," +"\n\n\n\n"+regards+"\n"+sig+"\n"+ message.innerHTML;
}