// ==UserScript==
// @name           Already Read the Rules
// @namespace      Flying h4x0r
// @description    Removes the "Read the Rules" link under the post button so you won't lose your post by accidentally clicking it
// @include        http://*.shacknews.com/*
// @include        http://shacknews.com/*
// ==/UserScript==
/*
	injectcss function stolen from Shack Font from SwiftyPants and also Shack-lol by: Thom Wetzel - www.lmnopc.com (C)2007 Thom Wetzel. thx guys.
	"injectCSS" function stolen from: http://userscripts.org/scripts/source/1074.user.js
*/


(function() {
	function injectCSS(css){
		head = document.getElementsByTagName("head")[0];
		style = document.createElement("style");
		style.setAttribute("type", 'text/css');
		style.innerHTML = css;
		head.appendChild(style);
	}
	var css = "";
		css += "div.inlinereply p.rules {visibility: hidden !important;}";
		injectCSS(css);
	
})();