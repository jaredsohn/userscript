// ==UserScript==
// @name        imdb no ref
// @namespace   http://userscripts.org/users/jbvsmo
// @description Remove ref from links
// @include     http*://*.imdb.*
// @version     1
// @grant       none
// ==/UserScript==

var links = document.links;
var link;
for(var i=links.length-1; i >=0; i--){
  link = links[i];
  var reg = /[\\?&]ref_=[^&#]*/gi;
  link.href = link.href.replace(reg, '');
}