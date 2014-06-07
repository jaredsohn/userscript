// ==UserScript==
// @name           Facebook Recent Stories first
// @version        1.1.7
// @namespace      http://www.halogs.co.nr
// @description    Reorganizes facebook to always show recent stories.
// @downloadURL     http://userscripts.org/scripts/source/126150.user.js
// @updateURL       http://userscripts.org/scripts/source/126150.meta.js
// @include        *://www.facebook.com/
// @include        *://www.facebook.com/home.php
// @exclude        *://www.facebook.com/?sk=h_chr
// @exclude        *://www.facebook.com/?sk=h_nor
// @icon	   http://hpr999.webs.com/GMUS/facebook-icon.png
// @run-at         document-start
// ==/UserScript==

//Stops iFrame
if (window.frameElement) return;

var Facebook = 'http://www.facebook.com/'
var FacebookPHP = 'http://www.facebook.com/home.php'
var FBS = 'https://www.facebook.com/'
var FBPHPS = 'https://www.facebook.com/home.php'

if (window.location.href == Facebook || FacebookPHP) {window.location.href = 'http://www.facebook.com/?sk=h_chr'; }
else {if (window.location.href == FBS || FBPHPS) {window.location.href = 'https://www.facebook.com/?sk=h_chr'; }
}