// ==UserScript==
// @name           SA Tablefixer
// @description    Breaks long text wads in Something Awful forums thread titles at every 15 characters so they can wrap
// @include        http://*somethingawful.com/forumdisplay.php?*
// ==/UserScript==

var titles = document.evaluate('//a[@class="thread_title"]', document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < titles.snapshotLength; ++i)
{
    var title = titles.snapshotItem(i);
    title.textContent = title.textContent.replace(/(\S{15})/g, "$1 ");
}