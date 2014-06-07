// ==UserScript==
// @description Everything went better than expected.
// @name    Me Gusta
// @version 1.0
// @author Whigg
// ==/UserScript==

var texts = document.evaluate("//text()[contains(.,'Like')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var ai = texts.snapshotLength - 1 ; ~ai ; --ai )
{
    var text = texts.snapshotItem(ai);

    text.textContent = text.textContent.replace(/Like/ig, 'Me Gusta');
}