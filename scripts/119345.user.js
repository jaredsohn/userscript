// ==UserScript==
// @name          MyTestScript
// @description   Not for download.
// @include       http://www.dpchallenge.com/messaging.php*
// @version       0.1h
// @summary		  Not for download

// ==/UserScript==

function() {
	
var form = document.getElementById("message_reply");
var container = document.getElementById("message_info");
var formClone = form.cloneNode(true);
formClone.setAttribute("id", form.id + "_clone");
container.appendChild(formClone);

}