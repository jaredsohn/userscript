// ==UserScript==
// @name           Yahoo! オークション 検索結果100件表示
// @namespace      http://note.ractica.com/
// @description    ヤフオクの検索結果を常に100件で表示するようにします
// @include        http://auctions.search.yahoo.co.jp/search*
// @version        0.0.1b
// ==/UserScript==

(function ()
{
    var xpathSelect = document.evaluate('/html/body/div[2]/div[2]/div/div[2]/div/div[3]/div[2]/div/div/form/div/select', 
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!xpathSelect.snapshotLength) {
        return;
    }

    var tagSelect = xpathSelect.snapshotItem(0);

    for (i = 0; i < tagSelect.length; i++) {
        if (tagSelect.children[i].selected === true && tagSelect.children[i].value == 100) {
            return;
        }
    }

    tagSelect.selectedIndex = 2;

    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    tagSelect.dispatchEvent(event);

}
) ();
