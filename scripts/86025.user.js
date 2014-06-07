// ==UserScript==
// @name           GoogleTest
// @description    Redirects to "Did you mean" version of Google search.
// @include        http://*.google.*/*
// ==/UserScript==

(function () {

if ((/q=/).test(document.location.href)) {
	if (!(/&nfpr=1/).test(document.location.href)) {
		window.location = window.location + "&nfpr=1";
	}
}
})()