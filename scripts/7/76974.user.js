// ==UserScript==
// @name           Scratchies 
// @namespace      Ranatama
// @include        http://*animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

var link = document.evaluate("//td[2]/b/font/a", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    var cancelled = false;

    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0,
            false, false, false, false,
            0, null);
        cancelled = !link.dispatchEvent(event);
    }
    else if (link.fireEvent) {
        cancelled = !link.fireEvent("onclick");
    }

    if (!cancelled) {
        window.location = link.href;
    }
