// ==UserScript==
// @name TVShack Footer Ad Remover
// @description Removes the Clicksor ad at the bottom of the page.
// @include http://tvshack.cc/*
// @include http://www.tvshack.cc/*
// @include tvshack.cc/*
// @include tvshack.cc
// ==/UserScript==

window.setTimeout(function() {
		var d1 = document.getElementById("wrap-outer");
		var d2 = document.getElementById("footer-advert");
		d1.removeChild(d2);
		d3 = document.getElementById("footer");
		d3.style.marginTop="650px";
});