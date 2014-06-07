// ==UserScript==
// @name        Excite link changer
// @namespace   Ganti Link / Link Changer
// @description Ganti link dari point.excite.co.id menjadi aft.excite.co.id
// @version     (1.1 Royhan)
// @grant       none
// ==/UserScript==
var link;
link = document.evaluate('//a[contains(@href, \'point.excite.co.id/material/item/?ad_id=\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var p = 0; p < link.snapshotLength; p++)
{
    var lin = link.snapshotItem(p);
    lin.href = lin.href.replace('point.excite.co.id/material/item/?ad_id=', 'aft.excite.co.id/trackst/?ad_id=');
}
