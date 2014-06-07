// ==UserScript==
// @name           [WLM] Bypass Redirect Warning
// @namespace      Personoid
// @description    Bypass the Windows Live Redirect Warning
// @include        http://link.smartscreen.live.com/*
// @include        https://link.smartscreen.live.com/*
// @require        http://pastebin.com/raw.php?i=V9K4vriH
// ==/UserScript==

var aTemp = (document.location.href).split("?")[1].split("&");

for (i = 0; i < aTemp.length; i++) {
	if (aTemp[i].split("=")[0] == "l") {
		document.location = htmlspecialchars_decode(unescape(aTemp[i].split("=")[1]), 'ENT_QUOTES');
	}
}