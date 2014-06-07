// ==UserScript==
// @name        Tages Anzeiger Cursor Keys for Galleries
// @namespace   http://userscripts.org/users/83191
// @description Enables forward/back navigation in galleries using right/left keys
// @include     http://www.tagesanzeiger.ch/*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
    function keyHandler(e) {
        if (!e) {
            e = window.event;
        }
        if (e.keyCode == 39) {
            var forward = document.evaluate("//div[contains(concat(' ',normalize-space(@class),' '),' forward ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            var back = document.evaluate("//div[contains(concat(' ',normalize-space(@class),' '),' back ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            forward.singleNodeValue.click();
        }
        if (e.keyCode == 37) {
            var forward = document.evaluate("//div[contains(concat(' ',normalize-space(@class),' '),' forward ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            var back = document.evaluate("//div[contains(concat(' ',normalize-space(@class),' '),' back ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            back.singleNodeValue.click();
        }
    }
    document.onkeypress = keyHandler;
}, false);
