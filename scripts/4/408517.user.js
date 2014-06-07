// ==UserScript==
// @name      aweweqqwe
// @namespace lainscripts_no_ywdawfas
// @include   */awdafcas?*
// @version   1
// @grant     none
// ==/UserScript==

heets = document.querySelectorAll('style'), ads = [],
    match, s = sheets.length, re = /\.b-serp-item:nth-child\([0-9]+\)/g;

while (s--) while (match = re.exec(sheets[s].innerHTML))
    if (ads.indexOf(match[0]) == -1) ads.push(match[0]);

while(ads.length) document.querySelector(ads.pop()).style.display = 'none';