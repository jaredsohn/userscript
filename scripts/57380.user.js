// ==UserScript==
// @name           Szczęśliwy Fox
// @namespace      http://userscripts.org/scripts/show/7538
// @version        1.4
// @description    Dodaje "szczęśliwy traf" na stronie google firefoxa oraz stronach wyszukiwania.
// @include        http://www.google.com/firefox*
// @include        http://www.google.com/search?*
// @include        http://www.google.pl/firefox*
// @include        http://www.google.pl/search?*
// ==/UserScript==

var lucky = document.createElement("span")
lucky.innerHTML = '<input type=submit value="Szczęśliwy traf" name="btnI" id="btnI">'

document.getElementsByTagName('INPUT')[0].parentNode.appendChild(lucky)