// ==UserScript==
// @name           Google Reader - show entry in background tab
// @namespace      http://zurg.jp/
// @include        http://www.google.com/reader/*
// @include        http://www.google.co.jp/reader/*
// @include        https://www.google.com/reader/*
// @include        https://www.google.co.jp/reader/*
// ==/UserScript==

document.addEventListener('keydown', objEntry, false);

function objEntry(event) {
    var currentURL = getCurrentEntryURL();
    if (currentURL) {
        // when 'y' key down
        if (event.keyCode == 89) {
            openNewBackgroundTab(currentURL);
        }
    }
}

function openNewBackgroundTab(url){
    var a = document.createElement("a");
    a.href = url;
    var evt = document.createEvent("MouseEvents");    
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}

function getCurrentEntryURL() {
    var currentEntry = xpath('//div[@id="current-entry"]//a[@class="entry-title-link"][@href]');
    return currentEntry ? currentEntry.href : null;
}

// helper function
function xpath(query) {
    return document.evaluate(
        query,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}
