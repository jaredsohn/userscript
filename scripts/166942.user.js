// ==UserScript==
// @name Align images to baseline on SA forums
// @include http://forums.somethingawful.com/showthread.php*
// ==/UserScript==
(function (window) {
	var document = window.document,
		cssText = "#thread td.postbody img { vertical-align: baseline !important;}",
		style = document.createElement('style');

	style.textContent = cssText;

	document.head.appendChild(style);
}(window));