// ==UserScript==
// @name       Yahoo! Bid Navigation Hotkeys
// @description  Add hotkey (right, left) to Yahoo! bid search result page for eaiser navigation.
//
// @homepage      http://userscripts.org/scripts/show/479033
// @updateURL     https://userscripts.org/scripts/source/479033.meta.js
// @downloadURL   https://userscripts.org/scripts/source/479033.user.js
//
// @version    0.1
//
// @match        https://tw.bid.yahoo.com/*
// @match        https://tw.search.bid.yahoo.com/*
// @match        https://tw.user.bid.yahoo.com/*
// @copyright  2014+, Pei-Tang Huang
// @require http://cdn.craig.is/js/mousetrap/mousetrap.min.js
// ==/UserScript==

(function(){
    var clickOnNodeWithText = function(text) {
        var targetButton = document.evaluate("//a[contains(., '" + text + "')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (targetButton) {
            targetButton.click();    
        }
    };
    
    Mousetrap.bind('right', function() {
        clickOnNodeWithText("下一頁");
    });
    
    Mousetrap.bind('left', function() {
        clickOnNodeWithText("上一頁");
    });
})();