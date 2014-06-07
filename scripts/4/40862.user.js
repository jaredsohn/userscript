// ==UserScript==
// @name Wikimage
// @namespace cshamoo
// @include http://*.wikipedia.org/wiki/*
// ==/UserScript==
 
(function() {
 
var title = document.getElementsByTagName('h1')[0].innerHTML;
var google = "http://images.google.co.jp/images";
var q = google + '?q=' + title;
var iframe = document.createElement('iframe');
var content = document.getElementById('content');
 
iframe.src = q;
iframe.border = "0";
iframe.style.width = "100%";
iframe.style.height = "1200px";
iframe.style.border = "none";
 
content.appendChild(iframe);
 
})();
 
 