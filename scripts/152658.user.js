// ==UserScript==
// @name           Ekşi Duyuru Sabit Header
// @version        0.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://eksiduyuru.com/*
// @include        http://www.eksiduyuru.com/*
// ==/UserScript==

function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var header = xpath("//div[@class='header']").snapshotItem(0);
var whitebox = xpath("//div[@class='whitebox']").snapshotItem(0);
whitebox.style.marginTop = "175px";
header.style.position = "fixed";
header.style.width = "970px";
header.style.top = "0px";
header.style.zIndex = "99999";