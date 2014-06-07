// ==UserScript==
// @name           wikipedia interwiki sorting order checker
// @namespace      none
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==
//
// http://meta.wikimedia.org/wiki/Interwiki_sorting_order

var doc = window.document;
var langs = doc.querySelectorAll("div#p-lang > div.pBody > ul > li");

for (var i = 0; i < langs.length-1; i++) {
    var l1 = langs[i].className;
    var l2 = langs[i+1].className;
    
    if (l1 >= l2){
        langs[i+1].setAttribute("style", "background-color: #FFAAAA;");
	i = i + 2;
    }
}