// ==UserScript==
// @name           JSLint Correction
// @namespace      http://userscripts.org/users/62927
// @description    Correcting the Warning on jslint.com
// @include        http://jslint.com/
// @include        http://jslint.com/index.html
// @include        http://www.jslint.com/
// @include        http://www.jslint.com/index.html
// ==/UserScript==


function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

warningText=xpath("//div[@id='output']/div/big").snapshotItem(0);
if (warningText) {
	warningText.innerHTML = 'WARNING: JSLint WILL hurt your feelings.';
}
