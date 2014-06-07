// ==UserScript==
// @name           BROKEN
// @namespace      http://www.digg.com
// @description    Replaces the word "BREAKING" with "LAME" on Digg stories
// @include        http://www.digg.com/*
// ==/UserScript==

// Change newStr to whatever word you'd like to use.
newStr = "LAME";

var foo = document.getElementsByTagName("H3");
for(i=0; i<foo.length; i++){
    foo[i].innerHTML = foo[i].innerHTML.replace(/BREAKING/i, newStr);
}