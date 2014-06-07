// ==UserScript==
// @name           What.CD: Change username.
// @namespace      http://google.se
// @description    What.CD: Change username.
// @include        *what*cd*
// ==/UserScript==

//for my own reference: var usernick = document.getElementsByClassName('username')[0].textContent;
var usernick = document.getElementsByClassName('username')[0].innerHTML;
(function() {
    var textNodes =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        node = textNodes.snapshotItem(i);
	node.data = node.data.replace(usernick, 'new_nick_goes_here')
    }

})();