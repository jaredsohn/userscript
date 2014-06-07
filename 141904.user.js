// ==UserScript==
// @name         xtra MMT
// @namespace    http://no.homepage/
// @version      0.1
// @description  xtra MMT
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @include      http://*.mymagictales.com/*
// @exclude      http://forum.*.mymagictales.com/*
// @exclude      http://*.mymagictales.com/xhodon/chat.php
// @copyright    u
// ==/UserScript==

// Function initializing the script
var xStart=function () {
	var hash=document.location.hash;
	var welt=hash.substr(8,2);
	$("body").find(".xtraMMT").remove();
    $("#menu-ally.btn_container ul li.submenu-first").after('\
        <li class="xtraMMT"><a href="http://'+welt+'.de.mymagictales.com/xhodon/guild.php?show=messageboard" onclick="return ajax_link(this.href)">schwarzes Brett</a></li>\
        <li class="xtraMMT"><a href="http://'+welt+'.de.mymagictales.com/xhodon/guild.php?show=guestsbook" onclick="return ajax_link(this.href)">G&auml;stebuch</a></li>\
    ');
}

// Startup sequence
var orig=unsafeWindow.ajax_load;
unsafeWindow.ajax_load=function (display) {
    orig(display);
	if (display==false) {
		setTimeout(xStart,1);
	}
}
