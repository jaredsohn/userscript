// ==UserScript==
// @name        AutoPureCookie

// @namespace   AutoPureCookie

// @description Automatically loads PureCookie

// @include     http://orteil.dashnet.org/cookieclicker/

// @version     1

// @grant       none

// ==/UserScript==


loadPureCookie = function (){
	var script = document.createElement('script');
	script.setAttribute('src','http://pastebin.com/raw.php?i=ur9DBHwu');
	document.body.appendChild(script);
};

setTimeout(function() {
    loadPureCookie();
}, 2000);