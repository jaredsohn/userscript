// ==UserScript==
// @name		Kill@sazae_f
// @description		Never show that ****ing @sazae_f on favstar.
// @include		http://*.favstar.fm/*
// ==/UserScript==

// Add your enemies' account name like below. 
// TODO: make a neat interface to add/remove enemy list.
var arr = new Array("sazae_f","masuo_f");
GM_setValue("ignoreList",arr.toSource());
//console.log(GM_getValue("ignoreList"));

// main part. remove their tweets from favstar
var ignoreList = eval(GM_getValue("ignoreList"));
for(var i = 0; i < ignoreList.length; i++){
    console.log("killing " + ignoreList[i]);
    var xPathExpression = "//a[@title='"+ ignoreList[i] + "']/../..";
    var result = document.evaluate(xPathExpression,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for ( var j=0 ; j < result.snapshotLength; j++ ){
        result.snapshotItem(j).style.display = "none";
    }
}