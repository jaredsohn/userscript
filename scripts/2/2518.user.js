// ==UserScript==
// @name          dom-knigi.ru banner remover
// @namespace     http://dottedmag.net/lib.aldebaran.ru/textbanner1/
// @description   Removes big fat dom-knigi.ru banner from the front page of lib.aldebaran.ru
// @include       http://lib.aldebaran.ru/*
// ==/UserScript==

(
    function()
    {
        var textBannerTable = document.evaluate(
            "//a[@href='http://www.dom-knigi.ru']/ancestor::table/ancestor::table/ancestor::table",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);

        if (textBannerTable.snapshotLength > 0) {
            var t = textBannerTable.snapshotItem(textBannerTable.snapshotLength - 1);
            t.parentNode.removeChild(t);
        }
    }
)();
