// ==UserScript==
// @name           Google+ Ubuntu font
// @description    Makes Google+ use Ubuntu font
// @author         Nasser Al-Hilal
// @namespace      http://nasser.me/
// @version        v1
// @license        CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @match          http://plus.google.com/*
// @match          https://plus.google.com/*
// @include        http://plus.google.com/*
// @include        https://plus.google.com/*
// ==/UserScript==


// from: http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Adding_a_Global_Style
function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

// There we go
addGlobalStyle("@import url(http://fonts.googleapis.com/css?family=Ubuntu&v2); body, * {font-family: 'Ubuntu', sans-serif !important;}");
