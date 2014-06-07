// ==UserScript==
// @name           fixmyspacechat
// @namespace      http://www.myspace.com37380953
// @description    www1 redirector
// @include        *www1.m*
// ==/UserScript==


s = new String(window.location);
s2 = s.replace(/www1./g,"www.");
window.location = s2