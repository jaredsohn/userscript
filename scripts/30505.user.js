// ==UserScript==
// @name           Yahoo Earnings Link to Google
// @namespace      http://owlwatch.blogspot.com/
// @description    Change ticker links to google finance
// @include        http://biz.yahoo.com/research/earncal/*
// ==/UserScript==

(function(){
    var ait = document.evaluate("//a[@href]", document, null, 
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elt;
    for(var ct=0; ct < ait.snapshotLength; ct++){
        elt = ait.snapshotItem(ct);
        if(elt.href.substring('finance.yahoo.com')){
            elt.href = elt.href.replace('finance.yahoo.com/q?s', 
                                        'finance.google.com/finance?q');
        }
    }
})()