/* Time-stamp: "2005-12-16 20:21:25 AST" -*-coding: latin-1;-*-             Âµ */
// ==UserScript==
// @name          GuardianBlackener
// @description   makes Guardian pages blacker and with simpler design
// @include       http://*.guardian.co.uk/*
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
  'body, * {',
  '  font-size: 25px !important;',
  '  background-color: black !important;',
  '  color: white;',
  '}',
  'font { font-size: 25px !important; }',

  ' a:link    { color: #a0a0ff !important;  text-decoration: underline !important; }',
  ' a:visited { color: purple !important; }',
  ' a:active  { color: red !important; }',

  //"form  { display: none !important; }',

  '#footerLinks { display: none !important; }',
  'table[border="0"][cellpadding="0"][cellspacing="0"][width="608"],',
  '#OvertureDivHolder,',
  '#OvertureDiv,',
  '#OvertureArtTrailDiv,',
  'td[width="608"][valign="top"],',
  '#gu_tkr_container,',
  '.MPU_display_class,',
  '#footerLinks',
  ' { display: none !important; }',

  'table, tr,  td { width: auto !important; }',

  'table[border="0"][cellpadding="0"][cellspacing="0"][width="128"]',
  '{ margin-right: 30px !important; }',

  'table[border="0"][cellpadding="0"][cellspacing="0"][width="128"] *',
  '{ font-size: 15px !important; }'
 ].join("\n"));

 return;
})();
//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~

//End
