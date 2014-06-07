// ==UserScript==
// @name          Google Reader share
// @namespace     greadershare
// @description   Brings back the Share button to Google Reader. 
// @include       http://www.google.*
// @include       https://www.google.*
// @version       0.3
// ==/UserScript==


var d = document;
if( d.location.href.match(new RegExp('reader/view')) ){
var ss = d.createElement('script');
ss.src = 'http://lipsumarium.com/greader/greader-share.js?nc='+Math.random();
d.body.appendChild(ss);
}