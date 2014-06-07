/* Time-stamp: "2006-07-20 23:26:41 ADT" -*-coding: latin-1;-*-             m */
// ==UserScript==
// @name          BruceSterlingBlog_blackener
// @description   simplify design of Bruce Sterling's blog, with larger fonts and white-on-black
// @include       http://wiredblogs.tripod.com/sterling/*
// @include       http://blog.wired.com/sterling/*
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
) { GM_addStyle( [

'body   { background-image: none !important; } ',
'* { ',
'  font-size: inherit !important; ',
'  background-color: black !important; ',
'  color: white; ',
'  line-height: normal !important; ',
'} ',
'#colM          { margin: 0 !important;   } ',
'#wrap          { color: black; margin: 0 !important;  width: 100% !important; } ',
'#wrap .content { color: white !important; } ',
'.entry         { margin-top: 1em; } ',
'.entry .title  { font-style: italic; } ',
'.blogTitle     { color: white !important; font-size: larger !important;} ',
'.time          { padding-bottom: 1em; border-bottom: 40px #333 solid; } ',
' ',
'#nav,.standardsNote,.skiplinks,.textSize,#colL,#colR,#hdr,#foot, ',
'#inbOld,form#wnsearch,.buffer  { display:none; } '

].join("\n")); }

//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~

//End
