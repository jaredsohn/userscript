// ==UserScript==
// @name       Dagens Media Remove Login
// @namespace  se.dagensmedia.removelogin
// @version    1.0
// @description  Enables you to read articles on dagensmedia.se which otherwise would force you to login
// @match      http://www.dagensmedia.se/*
// @copyright  Nope, no copyright whatsoever!
// ==/UserScript==

var elmDeleted = document.getElementById("authenticatorBackground");
	elmDeleted.parentNode.removeChild(elmDeleted);

var elmDeleted = document.getElementById("authenticatorPopup");
	elmDeleted.parentNode.removeChild(elmDeleted);

document.styleSheets[0].insertRule('.start.authenticatorBackgroundActive, .has-article.authenticatorBackgroundActive { overflow: auto !important; }', 0);