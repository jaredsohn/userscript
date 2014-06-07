// ==UserScript==
// @name           Harvard Crimson Cash support Allow Password Remembering
// @namespace      http://bitflood.org/~jmuhlich
// @description    Helps the Crimson Cash add value form play nicely with the Allow Password Remembering user script
// @include        https://cash.harvard.edu/payment.php
// ==/UserScript==

// find all text inputs with an onblur handler
var result = document.evaluate('//input[@onblur]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var i=0, node;
while (node = result.snapshotItem(i++)) {
    // disable blur/focus handlers
    node.removeAttribute('onblur');
    node.removeAttribute('onfocus');
    // if the value is the default "your xyz?" text, clear it
    if (node.value.substr(-1) == '?') {
        node.removeAttribute('value');
    }
}