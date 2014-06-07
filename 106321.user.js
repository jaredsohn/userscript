// ==UserScript==
// @name           HomerJ.de korrekte Zeit
// @description    Zeigt die richtige Zeit an, statt das "so zwischen bla und blubb"
// @version        0.4
// @include        http://www.homerj.de/index.php?show=forum&forum=*&thread=*
// @include        http://www.homerj.de/index.php?read_news=*
// @include        http://www.homerj.de/index.php?show=vods&play=*
// @include        http://homerj.de/index.php?show=forum&forum=*&thread=*
// @include        http://homerj.de/index.php?read_news=*
// @include        http://homerj.de/index.php?show=vods&play=*
// ==/UserScript==


var allSpanElements = document.evaluate("//span",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

// replace string in forum posts
for (var i = 0; i < allSpanElements.snapshotLength; ++i) {
    var item = allSpanElements.snapshotItem(i);
    if (item.getAttribute("title") != null) {
        item.innerHTML = item.getAttribute("title").substring(10);
    }
}