// ==UserScript==
// @name           AutoRefreshSearchTwitter
// @namespace      com.twitter.daisukebe
// @include        http://search.twitter.com/search?*
// ==/UserScript==

(function(){setInterval(function(){if(document.evaluate('//*[@id="new-res-count"]', document, null, 7, null).snapshotItem(0).innerHTML != '0'){location.href = document.evaluate('/html/body/div[2]/div/div[2]/h3/a', document, null, 7, null).snapshotItem(0).href;}}, 1000);})();