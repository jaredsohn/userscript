// ==UserScript== 
// @name	newJavaDoc 
// @namespace	java
// @description	redirects old java doc to the new java doc
// @include	http://download.oracle.com/javase/*
// ==/UserScript==
var url = document.location.href;
if (!url.match("javase/7/")) {
    var newUrl = url.replace(/javase\/[0-9.]+\//, "javase/7/");
    document.location.href = newUrl;
}
