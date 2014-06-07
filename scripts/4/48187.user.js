// ==UserScript==
// @name           Rivals Sliding Ad Block
// @namespace      http://userscripts.org/users/89142
// @description    Blocks the sliding flash ad that displays everyday
// @include        http://*.rivals.com/*
// ==/UserScript==


var ExpireDate = new Date( new Date().getTime() + (3650*24*60*60*1000) );
document.cookie = "PubAd=1; expires=" + ExpireDate.toGMTString() + ";domain=rivals.com";