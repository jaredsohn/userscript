/* Time-stamp: "2005-12-16 21:22:12 AST" -*-coding: latin-1;-*-             Âµ */
// ==UserScript==
// @name          McSweeneys_blackener
// @description   simplify design of the McSweeney's site
// @include       http://mcsweeneys.net/*
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
  'body {',
  '  font-size: 30px !important;',
  '  background-color: black !important;',
  '  color: white !important;',
  '}',

  'a:link { text-decoration: underline !important; color: #a0a0ff !important; }',
  'a:visited { color: purple !important; }',
  'a:active  { color: red !important; }'

 ].join("\n"));

 return;
})();
//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~

//End
