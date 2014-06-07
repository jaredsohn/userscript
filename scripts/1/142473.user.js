// Hide Furigana for NHK
// Author: Kristi Tsukida (http://github.com/kristi)
// Last updated: 2012-08-29
//
//
// ---------------------------------------------
//
// ==UserScript==
// @name			Hide Furigana for NHK
// @namespace		HF
// @description		Hide furigana on NHK site
// @version			1.0
// @include			http://www*.nhk.or.jp/*
// @homepage		http://userscripts.org/scripts/show/142473
// @updateURL		https://userscripts.org/scripts/source/142473.meta.js
// @icon			http://www.tofugu.com/wp-content/uploads/2007/06/tofugu1.png
// ==/UserScript==

function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

// ***********************************************************************************
// ** Begin Section Customization ****************************************************

// Get rid of white spaces under 'Feed settings...' menu, default enable
GM_addStyle("rt { display: none; }");
