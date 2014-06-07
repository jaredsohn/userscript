// ==UserScript==
// @name        PUAH post count
// @namespace   lel
// @description lel
// @include     http://puahate.com/*
// @version     1
// @grant       none
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

window.onload = function() {
	if(document.title != "PuaHate.com - Reply to Topic") {
		document.location.href = "http://puahate.com/newreply.php?do=newreply&noquote=1&p=2793021";
	}
	document.getElementById("vB_Editor_001_textarea").value = "puah sucks " + Math.random().toString();
	window.setTimeout(function() {
		document.getElementsByTagName("form")[2].submit();
	}, 20000);
}