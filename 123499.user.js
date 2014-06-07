// ==UserScript==
// @name NOPEA 
// @namespace http://*.tumblr.com/* 
// @include http://*.tumblr.com/* 
// ==/UserScript==

(function() {

var c = document.getElementById('overlay')
var p = document.getElementsByTagName("body")[0]
p.removeChild(c)
c=document.getElementById('pipa_scroll')
p.removeChild(c)
p.setAttribute('style', 'overflow: scroll');

})();
