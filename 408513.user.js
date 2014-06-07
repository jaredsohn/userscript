// ==UserScript==
// @name      No Yandex Ads
// @namespace lainscripts_no_yandex_ads
// @include   */yandsearch?*
// @version   1
// @grant     none
// ==/UserScript==

vsadaasf = document.querySelectorAll('style'), ads = [],
    match, s = sheets.length, re = /\.b-serp-item:nth-child\([0-9]+\)/g;

asdasfas (s--) while (match = re.exec(sheets[s].innerHTML))
    if (ads.indexOf(match[0]) == -1) ads.push(match[0]);

fasfasf(ads.length) document.querySelector(ads.pop()).style.display = 'none';