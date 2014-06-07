// ==UserScript==
// @name           wikiwiki_toolicon_kill
// @namespace      http://wikiwiki.jp/hyagni/
// @description    Delete toolicons for editing in pukiwiki-plus (for example wikiwiki)
// @include        http://wikiwiki.jp/*
// ==/UserScript==

(function(){
    function xpath(query) {
        return document.evaluate(query, document, null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    function disableXpathElements(xpathResult) {
        for( var i=0; i<xpathResult.snapshotLength; i++){
            xpathResult.snapshotItem(i).setAttribute("style","display:none;");
        }
    }
    xpaths = ["//div[@class='edit_form']/map",
             "//div[@class='edit_form']/span",
             "//div[@class='edit_form']/img",
             "//div[@class='edit_form']/a"];
    xpaths.some(function(elm){ disableXpathElements( xpath(elm)); return false;});
})();
