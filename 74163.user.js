// ==UserScript==
// @name           wikipedia rearrange other languages
// @namespace      none
// @include        http://*.wikipedia.org/wiki/*
// @include        https://*.wikipedia.org/wiki/*
// ==/UserScript==

// set your languages here
var myLangs = ["de", "en", "pl", "fr"];
// setting false will leave other languages in the list
var removeOthers = true;

var plang = window.document.querySelector("div#p-lang");
if (plang == null) return;
var langs = plang.querySelectorAll("div > ul > li");
var first = langs[0];
var ul = first.parentNode;

var found = [];
for (var i = 0; i < langs.length; i++) {
    var lncn = langs[i].className;
	var l1 = lncn.replace(/^.*interwiki-(\S+).*$/, "$1");
	
    var ln = myLangs.indexOf(l1);
    if (ln > -1) {
        found[ln] = langs[i];
    }
}

var foundcount = 0;
for (var i = found.length - 1; i >= 0; i--){
    if (found[i]) {
        ul.insertBefore(found[i], first);
        first = found[i];
        foundcount++;
    }
}

if (foundcount == 0){ 
    // remove "other languages" menu if empty
    plang.parentNode.removeChild(plang);
} else if (removeOthers){
    while(ul.children.length > foundcount) {
        ul.removeChild(ul.children[foundcount]);
    }
}
