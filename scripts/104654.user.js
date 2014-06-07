// ==UserScript==
// @name           immobilienscout24.de provision info
// @namespace      http://phpentwicklung.com
// @description    This script adds provision fee information to immobilienscout24.de search results.
// @include        http://www.immobilienscout24.de/Suche/*
// ==/UserScript==

if (unsafeWindow.console) {
    var GM_log = unsafeWindow.console.log;
}

var snapResults = document.evaluate("//li//h3//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
    var exposeUrl = snapResults.snapshotItem(i).href;

    GM_xmlhttpRequest({
        method: "GET",
        url: exposeUrl,
        onload: function(response) {
            var result = this.url.match(/expose\/([0-9]+)+/);
            var exposeId = result[1];

            var result = response.responseText.match(/is24qa-provision">(.*)</);
            var provision = null;
            if (result && result[1]) {
                // provision found
                provision = result[1];
            }

            var provisionTag = document.createElement('span');
            provisionTag.style.fontSize = '11pt';
            provisionTag.style.fontWeight = 'bold';
            if (null == provision) {
                provisionTag.style.color = 'green';
                provisionTag.innerHTML = 'Provision: Keine';
            }
            else {
                provisionTag.style.color = 'red';
                provisionTag.innerHTML = 'Provision: '+provision;
            }

            var snapResults2 = document.evaluate("//li//h3//a[@href='/expose/"+exposeId+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            snapResults2.snapshotItem(0).parentNode.parentNode.appendChild(provisionTag);
        }
    });
}