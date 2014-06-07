// ==UserScript==
// @name           Scopus smaller textarea
// @namespace      http://www.bjonnh.net/greasemonkey/scopus/
// @description    A small script used to reduce the size of a text input that puts submit button out of reach.
// @include        http://www.scopus.com/*
// ==/UserScript==
@-moz-document domain("www.scopus.com") {
   
var input = document.getElementById("searchterm1");
input.size="40";

}
