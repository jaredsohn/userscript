// ==UserScript==
// @name        full-width-editor-blogger
// @namespace   http://htsz.pl/
// @include     *blogger.com/blogger.g*
// @version     2.2
// ==/UserScript==

var headID = document.getElementsByTagName('head')[0];
var style = document.createElement('style');   
    style.type = 'text/css';
style.innerHTML = '<!-- iframe#postingComposeBox, #postingHtmlBox {max-width: 1600px !important;} body#postingComposeBox {width: 98% !important; margin: 8px auto !important;} -->';
  headID.appendChild(style);