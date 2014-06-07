// ==UserScript==
// @name           Wikipedia-to-Powerset
// @namespace      Wikipedia-to-Powerset
// @include        http://*
//
// @author         Chintana Wilamuna
// @version        0.01
// ==/UserScript==

for (i = 0; i < document.links.length; i++) {
    if (document.links[i].href.toString().match(/en.wikipedia.org/)) {
	var a = document.links[i].href.toString().slice(29);
	document.links[i].href = "http://powerset.com/explore/semhtml/" + a;
    }
}