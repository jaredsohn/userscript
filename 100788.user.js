// Author: Elad Ossadon ( http://elad.ossadon.com | http://devign.me | http://twitter.com/elado | elado7@gmail.com )

// ==UserScript==
// @name           Ynet, Calcalist & TheMarker Stop Auto Refresh. It's not '99 anymore
// @namespace      elad.ossadon.com
// @description    Stops the stupid auto refresh of articles while you're reading the article or comments, watching a video or selecting text as an occupational therapy. Because it's not '99 anymore. (And there are better ways to rotate ads).
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// @include        http://*.calcalist.co.il/*
// @include        http://calcalist.co.il/*
// @include        http://*.themarker.com/*
// @include        http://www.themarker.com/*
// ==/UserScript==

var _initialized = false;

function log(s) {
	try { console.log("Stop auto refresh: "+s); }
	catch (ex) {}
}

function init() {
	if (_initialized) return; _initialized = true;

	log("init");

	// phew! no direct access to global variables on the page from greasemonkey led me to do this:
	var script=unsafeWindow.document.createElement("script");
	script.text="\
		if (window._pageRefresher && window._pageRefresher.c) window._pageRefresher.c['screwYouAmateurs'] = true;\
		else if (window.pageRefreshDisable) {\
			pageRefreshDisable();\
			window.pageRefreshEnable=function(){console.log('pageRefreshEnable DISABLED.');};\
		}\
		else if (window.TM && TM.RefreshManager) {\
			TM.RefreshManager.cancelRefresh();\
			TM.RefreshManager.resumeRefresh=function(){console.log('TM.RefreshManager.resumeRefresh DISABLED.');};\
		}\
	";
	script.defer=true;
	unsafeWindow.document.body.appendChild(script);
	
	log("script here");
}

if (window.attachEvent) attachEvent("onload",init);
else addEventListener("load",init,false);
// ensure
setTimeout(function () { init(); },3000);
