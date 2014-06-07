// ==UserScript==
// @name           AddictingGames.com Auto-Play 2.0
// @namespace      http://userscripts.org/users/81652
// @description    Automatically relocates to the (full-browser) game. Now supports the ~10% that use "displayFlash('url', ...)" instead of "gameName = 'url'".
// @include        http://*.addictinggames.com/*
// @exclude        http://*.addictinggames.com/index.html
// @exclude        http://*.addictinggames.com/*.swf
// ==/UserScript==

function stub() {
	var windowObj = window.wrappedJSObject ? window.wrappedJSObject : window;
	if(windowObj.gameName)
		window.location.replace(windowObj.gameName);
	else if(/displayFlash/.test(document.body.innerHTML)) 
		window.location.replace(/displayFlash\(\'(.*).swf\'/(document.body.innerHTML)[1] + ".swf");
        else if(/param value\=\"(http\:\/\/www\.addictinggames\.com\/.*\/.*\.swf)\" name\=\"movie\"/.test(document.body.innerHTML))
        window.location.replace(/param value\=\"(http\:\/\/www\.addictinggames\.com\/.*\/.*\.swf)\" name\=\"movie\"/(document.body.innerHTML)[1]);
}

document.addEventListener("load", stub, true);	