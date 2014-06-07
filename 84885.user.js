// ==UserScript==
// @name           Google Searches Exactly What You Type
// @version       1.0.1
// @namespace      null
// @description    Google searches for exactly what you type in by inserting nfpr=1 into the url.
// @updateURL     https://userscripts.org/scripts/source/84885.meta.js
// @include        http://*.google.*/
// @include        https://*.google.*/
// @include        http://*.google.*/*q=*
// @include        https://*.google.*/*q=*
// @exclude        http://*.google.*/*nfpr=*
// @exclude        https://*.google.*/*nfpr=*
// @exclude        https://*.google.*/imgres*
// @exclude        http://*.google.*/imgres*
// @exclude        http://books.google.com/*
// @exclude        https://books.google.com/*
// @exclude        http*maps.google.com/*
// @exclude        http://news.google.com/newspapers*
// @exclude        https://news.google.com/newspapers*
// ==/UserScript==


var sTargetURL = window.location.href;
var sTargetURL1 = window.location.href.replace(/&q=/, '&nfpr=1&q=');
var sTargetURL2 = window.location.href.replace(/\?q=/, '?nfpr=1&q=');


if(sTargetURL1 == sTargetURL)
sTargetURL=sTargetURL2;
else
sTargetURL=sTargetURL1;

if(sTargetURL1 != sTargetURL2)
window.location.replace( sTargetURL );

var searchForms = document.querySelectorAll('form[action="/search"]');
var searchFormsLength = searchForms.length;
if (searchFormsLength) {

  var input   = document.createElement("input");
  input.name  = "nfpr";
  input.type  = "hidden";
  input.value = 1;

  var i = searchFormsLength;
  while (i--) {
    searchForms[i].appendChild(input);
  }
}