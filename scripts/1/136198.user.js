// ==UserScript==
// @name           My 1st gm script
// @namespace      NoBanner
// @description    test script
// @include        http://redmine.ec.pe/*

// ==/UserScript==

// ==============
// ==NoBanner==
body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = "div.issue{background:#abc !important;}"
	body.appendChild(div);
}
// ==============

