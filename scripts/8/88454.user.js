// ==UserScript==
// @name           Better BRPG Timer Notification
// @namespace      cmrn
// @include        http://www.boringrpg.com/*
// ==/UserScript==

function notify(){

	var regex = "[0-9]+ minutes";
	var result = text.match(regex);
	var mins = parseInt(result);
	setTimeout("alert('time to click soon!')",mins*60000)
}

notify();