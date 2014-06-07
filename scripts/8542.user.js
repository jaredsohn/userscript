// ==UserScript==
// @name          Forum Images Resizer
// @namespace     http://myspace.com/mike__j
// @description   resizes forum images ; actual size on hover
// @include       http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @include       http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewThread*

// ==/UserScript==

s = "";
s+= "a img, img{max-width:300px;}\n";
s+= "a:hover img, img:hover{max-width:800px;}\n";

GM_addStyle(s);