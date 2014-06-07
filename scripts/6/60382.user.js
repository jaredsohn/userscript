// ==UserScript==
// @name           Google Privacy Plus
// @namespace      #aVg
// @description    Gives the user back privacy and clean URLS on all google websites.
// @include        http://*.google.tld/*
// @version        0.1.3
// ==/UserScript==
(function() {
if((top && top.location != location) || document.domain.indexOf("mail.google")==0) return;
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A)}
function loop(A, B, C) {
	A = document.evaluate(A, C || document, null, 6, null);
	var I = A.snapshotLength;
	while(--I>=0) B(A.snapshotItem(I));
}
function other() {
	loop("//a[starts-with(@class, 'usg-')]", function(link) {
		link.removeAttribute("class");
	});
}
if(document.domain=="news.google.com") other();
else switch(location.pathname.substring(1)) {
	case "" :
	case "webhp" :
	document.body.addEventListener("DOMNodeInserted", function(A) {
		loop(".//*[@onmousedown]", function(A) {
			A.removeAttribute("onmousedown");
		}, A.target);
	}, false);
	return;
	case "search" :
	loop("//*[@onmousedown]", function(A) {
		A.removeAttribute("onmousedown");
	});
	return;
	default :
	other();
}

})();