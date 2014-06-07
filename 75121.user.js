// ==UserScript==
// @name          Anti-Idiot Filter for Swedish newspapers
// @namespace     http://skagedal.wordpress.com/antiidiot/
// @description   Removes comments sections on some Swedish newspapers.
// @include       http://*.expressen.se/*
// @include       http://*.aftonbladet.se/*
// @include       http://*.svd.se/*
// ==/UserScript==


function hide(node) {
	if (node) {
		node.style.display = 'none';
	}
}

if (/^http:\/\/[^/]+.expressen.se/.exec(location.href)) {
	hide (document.getElementById("comments"));
} else if (/^http:\/\/[^/]+.aftonbladet.se/.exec(location.href)) {
	hide (document.getElementById("abArtBox"));
} else if (/^http:\/\/[^/]+.svd.se/.exec(location.href)) {
	e = document.getElementById("articlecomments_commentwrapper");
	if (e)
		hide (e.parentNode);
}
