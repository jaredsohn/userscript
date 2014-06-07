// ==UserScript==
// @name          Static YouTube Header
// @description   Makes the YouTube header of the new design static so that it doesn't cover the top of the page when scrolling.
// @version       2014.02.21
// @author        schrobby
// @match         *://*.youtube.com/*
// @match         *://youtube.com/*
// @updateURL     https://userscripts.org/scripts/source/394518.meta.js
// @downloadURL    https://userscripts.org/scripts/source/394518.user.js
// ==/UserScript==

var s = document.createElement('style');
s.type = "text/css";
s.textContent = "#masthead-positioner { position: absolute!important; }" +
				"#page.watch #guide { position: static!important; }" +
				"#appbar-guide-menu, #appbar-guide-iframe-mask {" +
					"position: absolute!important; top: -50px!important;" + 
				"}";
document.head.appendChild(s);