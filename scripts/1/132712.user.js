// ==UserScript==
// @name           Harvard PIN login auto-forwarder
// @namespace      http://bitflood.org/~jmuhlich
// @description    Skips the "success" page after PIN login and navigates directly to the next page.
// @include        https://www.pin1.harvard.edu/pin/success?*
// ==/UserScript==

// find meta refresh element
var result = document.evaluate('/html/head/meta[@http-equiv="Refresh"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node = result.singleNodeValue;
if (node !== null) {
    var content = node.getAttribute('content');
    var url = content.substring(content.indexOf('URL=') + 4);
    document.location = url;
}

