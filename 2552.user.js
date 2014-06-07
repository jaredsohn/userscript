/* Time-stamp: "2006-07-20 22:55:44 ADT" -*-coding: latin-1;-*-             ý */
// ==UserScript==
// @name          SomethingAwfulBlackener
// @description   makes Something Awful pages blacker and with simpler design
// @include       http://*.somethingawful.com/*
// @version       0.0.2
// @namespace     http://interglacial.com/~sburke/pub/
// ==/UserScript==
/*  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
    !!
    !! This is a Greasemonkey user script.
    !! See http://greasemonkey.mozdev.org/ for info on using such things.
    !!
    -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
*/


if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {

GM_addStyle( [

  'form[target="_blank"], a[class="rightmenu"], div#leftcol, div#leftcontent, div#rightcontent, div#top_ad, #banner_bg, #top_header, #search_bar {',
  '  display: none !important; float: none !important; ',
  '}',

  '#centercontent { margin-left: 0 !important; }',
  '.article_body, .article_intro {',
  '  font-size:   inherit !important;',
  '  line-height: 140% !important;',
  '}',

  '.headline { font-size: larger; }',

  '* {',
  '  background-color: black !important;',
  '  color:            white !important;',
  '  background-image:  none !important;',
  '}'

].join("\n") ); }

//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~
//End
