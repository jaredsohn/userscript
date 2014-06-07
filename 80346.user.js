// ==UserScript==
// @name           qt beta documentation title changer
// @namespace      http://userscripts.org/users/185268
// @description    Removes the blabber from the beginning of <title>
// @include        http://userscripts.org/home/scripts
// ==/UserScript==
tmp = document.title
tmp = tmp.slice(tmp.lastIndexOf(":")+1)
document.title = tmp