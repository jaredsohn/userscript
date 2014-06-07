// ==UserScript==
// @name           highlight_anchor_target
// @namespace      *
// @include        *
// @description	   if url contains a target, the anchor in the site will be highlighted
// ==/UserScript==
//
// Some URIs refer to a location within a document. 
// This kind of URI ends with "#" followed by an anchor identifier (called the fragment identifier).
// This script will highligt the anchor in the document.
//
// For general info and as an example for this script see 
//   http://www.w3.org/TR/html401/intro/intro.html#fragment-uri
//
//
// author:         lual
// version:        2011-03-17 initial

GM_addStyle(":target { color: black !important; \
                       background-color: #78F48F !important; \
                       border: 1px solid #27A53F !important; \
                       border-bottom: 1px solid #1B6329 !important; \
                       border-right: 1px solid #1B6329 !important; \
                       -moz-border-radius: 3px 3px 3px 3px !important; }");