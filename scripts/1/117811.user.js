// ==UserScript==
// @name           AdBlockForEksi
// @description    AdBlockForEksi
// @version        0.6
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/*
// @include        https://antik.eksisozluk.com/*
// ==/UserScript==
function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
function BlockAdd() {
	var addiv = xpath("//div[contains(@class,'eol highlight')]");
	if(addiv.snapshotLength > 0) {
		addiv.snapshotItem(0).style.display = "none";
	}
}

    BlockAdd();
   