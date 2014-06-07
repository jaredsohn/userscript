/* Time-stamp: "2005-12-16 20:52:19 AST" -*-coding: latin-1;-*-             Âµ */
// ==UserScript==
// @name          Onion_blackener
// @description   simplify design of The Onion pages
// @include       http://*.theonion.com/*
// @version       0.0.1
// @namespace     http://interglacial.com/~sburke/pub/
// ==/UserScript==
/*  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
    !!
    !! This is a Greasemonkey user script.
    !! See http://greasemonkey.mozdev.org/ for info on using such things.
    !!
    -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
*/

(function() {
 var injectCSS = function injectCSS (css) {
   var head  = document.getElementsByTagName("head")[0];
   if(!head) throw "No head?!";
   var style = document.createElement("style");
   style.setAttribute("type", 'text/css');
   style.innerHTML = css;
   head.appendChild(style);
   return;
 };

 injectCSS( [
  '* {',
  '  background-color: black !important;',
  '  color:        white !important;',
  '  font-size:  inherit !important;',
  '  line-height: normal !important;',
  '  font-weight: normal !important;',
  '  background-image: none;',
  '}',

  '#sponsors, #left, #top, #bot, #right { display: none; }',

  '#departments, #center { ',
  '  margin:    0 !important;',
  '  padding: 1em !important;',
  '  width:  80%  !important;',
  '}',

  '#archives {',
  '  margin:    0 !important;',
  '  padding: 1em 0 0 0 !important;',
  '}',

  'h1, h2,  h3 {',
  '  border: 3px #557 solid;',
  '  border-top-color: #99B;',
  '  background-color: #005 !important;',
  '  margin-top: 1em !important;',
  '}'

 ].join("\n"));

 return;
})();
//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~

//End
