// ==UserScript==
// @name           elvenblood gold seeker
// @namespace      http://apps.facebook.com/elvenblood
// @description    shows users that matches specified exp and gold constraints.
// @include        http://apps.facebook.com/elvenblood/war*
// @include        http://apps.new.facebook.com/elvenblood/war*
// ==/UserScript==

var gold = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var mingold = 1000;
var maxexp = 7;
/*
for (var i = 310; i < 320; i = i + 1){    
    //alert(i + " " + gold.snapshotItem(i).data);
    if (gold.snapshotItem(i).data == "Gold:"){
        start = i + 1;
    }
}


for (var i = start; i < 516; i = i + 21){
    if (parseFloat(gold.snapshotItem(i-3).data) > 1 && parseFloat(gold.snapshotItem(i).data) > 1000){
        a = document.evaluate("//a[text()='" + gold.snapshotItem(i-10).data + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        GM_openInTab(a.snapshotItem(0).href);
    }
}

window.location.href = window.location.href;*/

for (var i = 310; i < 516; i++){
    //alert(i + " " + gold.snapshotItem(i).data);
    if (gold.snapshotItem(i).data == "Gold:"){
    i++;
        if (parseFloat(gold.snapshotItem(i-3).data) < maxexp + 1 && parseFloat(gold.snapshotItem(i).data) > mingold + 1){
            a = document.evaluate("//a[text()='" + gold.snapshotItem(i-10).data + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            GM_openInTab(a.snapshotItem(0).href);
        }
    i = i + 18;
    }
}

window.location.href = window.location.href;