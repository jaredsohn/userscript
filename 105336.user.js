// ==UserScript==
// @name           NyaaTorrents - Remove Title Prefix
// @namespace       http://userscripts.org/users/69620
// @description    Removes "NyaaTorrents >> " prefix from tab title
// @include        http://www.nyaa.se/?page=view&tid=*
// @include        http://sukebei.nyaa.se/?page=view&tid=*
// @grant          none
// ==/UserScript==

document.title = document.title.replace('NyaaTorrents >> ', '')