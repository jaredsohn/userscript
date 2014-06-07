// ==UserScript==
// @name        Linkify Księgi Wieczyste
// @namespace   http://github.com/zaza
// @include     http://www.licytacje.komornik.pl/Notice/Details/*
// @include     http://ekw.ms.gov.pl/pdcbdkw/pdcbdkw.html*
// @version     0.2
// @grant       none
// ==/UserScript==

function getQuery(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function matchAndCreateLink(child) {
    var exp = /([0-9A-Z]{4}\/[0-9]{8}\/[0-9]{1})/ig;
    var h = child.innerHTML;
    var m = h.match(exp);
    if (m != null) {
	    child.innerHTML = '<a href="http://ekw.ms.gov.pl/pdcbdkw/pdcbdkw.html?kw='+h+'">'+h+'</a>';
    }
}

function scan(children) {
	for (i in children) {
    	if (children[i].innerHTML == undefined) continue;
    	if (children[i].children.length == 0)
        	matchAndCreateLink(children[i]);
    	else 
        	scan(children[i].children);
	}
}

function scanPreview() {
	if ($('Preview') == null) return;
	scan($('Preview').children);
}

function insertKw() {
	var kw = getQuery('kw');
	if (kw === "") return;
	var parts = kw.split("/");
	if (parts.length != 3) return;
	$("#id1")[0].value = parts[0]
	$("#id2")[0].value = parts[1]
	$("#id3")[0].value = parts[2]	
}


scanPreview();
insertKw();