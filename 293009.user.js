// ==UserScript==

// @name Black
// @namespace BlackTest
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
	div.innerHTML = "body { color: #ffffff; }"
	body.appendChild(div);
}

// ===============