// ==UserScript==
// @name           Anti-anti-ad-block for Firefox og nye Aftenposten.no
// @namespace      http://code.kjonigsen.net
// @description    Fjerner svarte bokser som kommer over artikler på nye aftenposten.no om du kjører ad-block.
// @include        http://www.aftenposten.no/*
// ==/UserScript==


if( typeof(GM_addStyle)=='undefined' ) {
	function GM_addStyle(styles) {
		var S = document.createElement('style');
		S.type = 'text/css';
		var T = ''+styles+'';
		T = document.createTextNode(T)
		S.appendChild(T);
		document.body.appendChild(S);
		return;
	}
} 

// generic block function
function block(selector) {
	GM_addStyle(selector + " { display: none !important; }");
}

block("header.header"); // black box covering articles
block("section.widget.relatedContents.flyout.active"); // popup
block("section.widget.moodboard.default"); // moodboard
block("section.widget.minimizedFrontpagePart.default") // frontpage with zoomer
block("nav.smallHeader"); // floating header on top of page when scrolling