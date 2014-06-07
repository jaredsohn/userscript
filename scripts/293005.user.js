// ==UserScript==
// @name Blocks Adds
// @namespace RemBanner
// @description Removes the banner from the right side of the page
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*

// ==/UserScript==

// ===============
// ===RemBanner===

body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = ".ego_column, .uiStreamBoulderThemeAgg { display: none !important; }"
	body.appendChild(div);
}
// ===============