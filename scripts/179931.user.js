// ==UserScript==
// @name        [hotnews.ro] Ascunde rubrica Magazin
// @namespace   gp
// @description Ascunde rubrica „Magazin” de pe homepage-ul site-ului HotNews.ro.
// @include     http://www.hotnews.ro/
// @version     1.2
// @grant       none
// ==/UserScript==

function main() {
    var mag = document.evaluate('((//h2[contains(@class, "article_title")] | //div[@class="titlu"])/a[contains(@href, "/stiri-magazin-")]/../..) | //div[@class="articolLeadCeleMai"]/a[contains(@href, "/stiri-magazin-")]/..', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < mag.snapshotLength; i++) {
        var div = mag.snapshotItem(i);
        div.parentElement.removeChild(div);
    }
}

main();
