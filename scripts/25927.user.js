// ==UserScript==
// @name           Sovserv test
// @namespace      http://sovserv.ru
// @include        http://sovserv.ru/vbb/showthread.php*
// @include        http://localhost/test/*
// ==/UserScript==
var elementi = getelementsbytagname("*");
document.write("dlinna vseh elementov "+elementi.length);
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var allE, thisE;
allE = xpath('//table[@cellpadding="10"]');
for (var i = 0; i < allE.snapshotLength; i++) {
    thisE = allE.snapshotItem(i);
    myTR = thisE.getElementsByTagName("TR")[0];
    myTD = myTR.getElementsByTagName("TD")[0];
    myDIVS = myTD.childnodes;
    myDIV = myDIVS[1];
    myDIV.style.background = "rgb(255,0,0)";
var cellText = document.createTextNode("fried chicken # "+myDIVS.length);   
    myDIV.appendChild(cellText);
}