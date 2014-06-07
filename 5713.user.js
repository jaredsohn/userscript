// ==UserScript==
// @name           No Underline Links
// @namespace      nothing@nowebspace.com
// @description    No UNDERLINE

// ==/UserScript==


s= '';
s+= 'a:hover {text-decoration:none !important;}';

GM_addStyle(s);