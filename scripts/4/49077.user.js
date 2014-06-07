// ==UserScript==
// @name           ShowFreeOnly
// @namespace      http://nik-martin.com
// @description    shows only free software on MacUpdate and VersionTracker
// @include        http://www.macupdate.com/*
// @include	   http://www.versiontracker.com/*
// ==/UserScript==

GM_addStyle(".eliminateMe { visibility: hidden ! important; display: none !important; }");

(function () {
var xyz;
if(document.getElementsByTagName('a')){for(var z=0;(xyz=document.getElementsByTagName('a')[z]);z++){if(xyz.text=='Updater'||xyz.text=='Shareware'||xyz.text=='Update'||xyz.text=='Commercial'||xyz.text=='Beta'||xyz.text=='Demo'){xyz.parentNode.parentNode.className='eliminateMe';}}}})();