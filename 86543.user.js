// ==UserScript==
// @name           Facebook De-Egotizer
// @author         adam_krebs
// @version        1.5
// @description    Removes "Ego" sidebar on facebook (photo memories, related events) using jQuery
// @include        http://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://*.facebook.com/help/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function Remove_Facebook_Ego() {
   if ($(".ego_column").length != 0) { // only remove if element actually exists. fixes hanging on FF
	$("netego_organic").hide();
	$(".ego_column").hide();
   }
}

document.addEventListener("DOMNodeInserted", Remove_Facebook_Ego, true);
