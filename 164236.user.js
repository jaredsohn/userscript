// ==UserScript==
// @name        RPS Betterify
// @namespace   somini
// @description Makes the best gaming site even better
// @include     http://www.rockpapershotgun.com/*
// @version     2.1
// ==/UserScript==

classes_names = ["OUTBRAIN","simplePullQuote"];
for (var sn=0;sn<classes_names.length;sn++) {
	a = document.getElementsByClassName(classes_names[sn]);
	for (var i=0;i<a.length;i++) {
		a[i].setAttribute("style","display:none");
	}
}

ids_ids = ["top-comments"];
for (var I=0;I<ids_ids.length;I++) {
	a1 = document.getElementById(ids_ids[I]);
	a1.setAttribute("style","display:none");
}