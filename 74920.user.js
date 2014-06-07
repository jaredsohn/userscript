// ==UserScript==
// @name           ForcePicasaVersion3
// @namespace      http://userscripts.org/users/154258
// @description    Tells PicasaWeb that Picasa3 is used, which ungreys the "Download to Picasa" (and similar) links
// @include        http://picasaweb.google.com/*
// ==/UserScript==

unsafeWindow._picasaVersion=3;

//window.addEventListener(
//    'load',
//    function() { unsafeWindow._picasaVersion=3; },
//    true);
