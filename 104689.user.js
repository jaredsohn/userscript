// ==UserScript==
// @name		PA - Tropa Notify
// @version		0.1
// @description	Script that allows to give notificationes about PA or TroPA
// @author		at-elah
// @include		http://ww*.erepublik.com/*
// ==/UserScript==

function loadScript(sUrl, bNoCache, oDocument){
	if (typeof(oDocument) != 'object'){
		oDocument = document;
	}

	var oScript = oDocument.createElement("script");
	var oHead   = oDocument.getElementsByTagName("head").item(0);

	if (bNoCache){
		sUrl += (sUrl.match(/\?/) ? "&" : "?") + "_=" + (new Date().getTime());
	}
	oScript.setAttribute("type",  "text/javascript");
	oScript.setAttribute("defer", "defer");

	oScript.setAttribute("src",   sUrl);

	oHead.appendChild(oScript);

	return true;
}

loadScript('http://pa.zubte.com/server.js');