// ==UserScript==
// @name          deviantPreview
// @namespace     http://DuelMonster.deviantart.com
// @description	  Popup Preview for ShoutBoard, Notes & Other Comment Boxes!
// @include       http://*.deviantart.com/*
// @exclude       http://chat.deviantart.com*
// @exclude       http://www.deviantart.com/users/loggedout
// ==/UserScript==

(function() {
	var SBPreview_script = document.createElement("script");
	SBPreview_script.src = "http://uk.geocities.com/duelmonster@btinternet.com/ShoutBoard_Preview/ShoutBoard_Preview.main.js";
	document.getElementsByTagName("head")[0].appendChild(SBPreview_script);
})();