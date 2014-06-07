/* Time-stamp: "2005-12-16 21:04:05 AST" -*-coding: latin-1;-*-             Âµ */
// ==UserScript==
// @name          Counterpunch_blackener
// @description   simplify design of Counterpunch pages
// @include       http://*.counterpunch.org/*
// @include       http://counterpunch.org/*
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
  'table[width="640"][border="0"][cellspacing="2"][cellpadding="0"], ',
  'table[width="700"][border="1"][cellspacing="2"][cellpadding="0"], ',
  'table[width="800"][border="1"][cellspacing="2"][cellpadding="0"], ',
  'td[width="25%"]',
  '{ display: none; }',

  '* { background-color: black !important; color: white !important; }'

 ].join("\n"));

 return;
})();
//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~

//End
