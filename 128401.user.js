// ==UserScript==
// @name        ThankYou Displayer
// @namespace   http://www.milepoint.com
// @description Automatically expand ThankYou point balances.
// @include     https://thankyou.com/accountStatementExpiry.jspx*
// @include     https://*.thankyou.com/accountStatementExpiry.jspx*

// @version     1.0
// ==/UserScript==

window.addEventListener('load',
function() {
    var allExpiring = document.evaluate("//div[@class='glBlindContent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i = 0; i < allExpiring.snapshotLength; i++) {
        allExpiring.snapshotItem(i).style.display='block';
    }
}, true);
