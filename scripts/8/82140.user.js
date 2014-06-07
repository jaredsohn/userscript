// ==UserScript==
// @name           Google Image Basic
// @description    Redirects to "basic version" of Google Images. Based on Google Images direct links by Dwoo
// @include        http*://images.google.*/*
// @include        http*://*.google.*/images?*
// @include        http*://*.google.*/imgres?*
// @include        http*://*.google.*/imghp*
// @include        http*://*.google.*/search*


// ==/UserScript==

(function () {

if ((/q=/).test(document.location.href)) {
	if (!(/&sout=1/).test(document.location.href)) {
		window.location.replace(window.location+"&sout=1");
	}
}
})()