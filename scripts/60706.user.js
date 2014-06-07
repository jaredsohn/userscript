// ==UserScript==
// @name name
// @namespace namespace
// @description Does jQuery stuff while playing nice with other JavaScript frameworks
// @author Caroline Schnapp
// @homepage http://11heavens.com/using-greasemonkey-to-load-and-use-jQuery
// @include *
// ==/UserScript==
 
// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  /* You put your jQuery code here, which must use the jQuery namespace. */
}, false);