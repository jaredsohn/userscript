// ==UserScript==
// @name          deviantART Junk Killer
// @description	  Remove the deviantART adbox, the "deviantART Notice" box, the "Sponsored Links" sidebar, and the embedded adboxes.
// @include       *.deviantart.com*
// @namespace http://www.ssokolow.com/
// ==/UserScript==

adMatchExpr = "//iframe[contains(@src,'ads.deviantart.com')]/../..[contains(@class,'output-primary')]" +
    " | //div/h2[contains(text(),'deviantART Notice')]/.." +
    " | //div/h2[contains(text(),'Sponsored Links')]/.." +
    " | //iframe[contains(@src,'ads.deviantart.com')]";

function removeIfMatch(xpathExpr) {
    if (results = document.evaluate(xpathExpr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)) {
        for (var i = 0; i < results.snapshotLength; i++) {
            target = results.snapshotItem(i);
            target.parentNode.removeChild(target);
        }
    }
}

(function() 
{
    try {
        removeIfMatch(adMatchExpr);
    } catch (e) {
        alert("UserScript exception: " + e);
    }
} 
)();
