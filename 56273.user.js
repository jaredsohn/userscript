// ==UserScript==
// @name           Linkbucks Frame Remover
// @namespace      linkbucks
// @include        http://*.linkbucks.com/url/*
// ==/UserScript==

var url = document.URL.split("url/")[1];
window.location = url;
