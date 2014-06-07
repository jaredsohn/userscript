// ==UserScript==
// @name           No Advert in the Facebook
// @namespace      NoBanner
// @description    No Advert in the Facebook (+ Apps + Games)
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*

// ==/UserScript==

// ==============
// ==NoBanner==
body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = ".ego_column, .uiStreamBoulderThemeAgg{display:none !important;}"
	body.appendChild(div);
}
// ==============
