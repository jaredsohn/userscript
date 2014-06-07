// ==UserScript==
// @name rtest
// @description learning testing (juck code)
// @include *
// ==/UserScript==
var allDivs, thisDiv, present;
allDivs = document.evaluate(
    "//div",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
present=0;
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    
if(thisDiv.innerHTML.indexOf('No Referrals available at the moment')>0) present=1;


}

if(present==1)
window.open("/");
