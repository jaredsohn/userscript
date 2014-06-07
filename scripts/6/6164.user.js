// ==UserScript==
// @name           My Way Google Ads Remover
// @author         David Cuthbert
// @namespace      http://www.kanga.org/greasemonkey
// @description    Remove Google Ads from My Way pages.
// @include        http://*.myway.com/*
// @version        1.3 (12-02-2006)
// ==/UserScript==

function remove_google_ads()
{
    var mexHdrs = document.evaluate('//span[@class="mexHdrTxt"]', document, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < mexHdrs.snapshotLength; ++i) {
        var mexHdr = mexHdrs.snapshotItem(i);

        // This should contain one node -- a text node with the text
        // "Google Sponsored Links"
        if (mexHdr.childNodes.length != 1) {
            continue;
        }

        if (mexHdr.firstChild.nodeType != 3) {
            continue;
        }

        if (mexHdr.firstChild.data != "Google Sponsored Links") {
            continue;
        }

        // Find the enclosing table -- should be the 8th parent.
        var table = mexHdr;
        for (var j = 0; table != null && j < 8; ++j)
            table = table.parentNode;

        if (table == null || table.tagName != "TABLE")
            continue;

        // The element enclosing the table itself, for removing the enclosing
        // table and his sibling spacer.
        var tableParent = table.parentNode;
        var spacer = table.nextSibling.nextSibling;

	tableParent.removeChild(table);
        if (spacer != null)
            tableParent.removeChild(spacer);
    }

    return;
}

remove_google_ads();
