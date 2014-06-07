// ==UserScript==
// @name           StripperWeb Reviews URL Rewrite
// @namespace      http://www.stripperweb.com
// @description    Rewrite malformed URLs in the Reviews section
// @include        http://*stripperweb.com/forum/*?country=*
// @include        http://*stripperweb.com/forum/*?state=*
// @include        http://*stripperweb.com/forum/*?city=*
// ==/UserScript==

document.location.href = document.location.href.replace(/forum/,'stripclubs')
