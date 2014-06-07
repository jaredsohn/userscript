//
// Makes some adjustments to Rivals sites to make them more tolerable.
//
// - Removes the right hand sidebar with "featured product", most notably on
//   the thread view page where it wastes horizontal real estate.
// - Moves the header (with current logged in user information & settings) to
//   the bottom of the page.
// - Moves site specific ads at the top of the topic list page to the bottom
//   of the page.  Adblock still leaves dead space, and I don't like blocking
//   these particular sponsors.
//
// ==UserScript==
// @name          Rivals Annoyances
// @namespace     http://danwalters.net/greasemonkey/rivalsannoyances
// @description   tweaks rivals message board pages to remove annoyances
// @include       http://*.rivals.com/*
// ==/UserScript==

// remove right hand sidebar with "featured product"
//
var locator = document.getElementById('featureproduct');
if (locator) {
    var rightSidebar = locator.parentNode;
    while (rightSidebar.nodeName != "TD") {
        rightSidebar = rightSidebar.parentNode;
    }
    rightSidebar.parentNode.removeChild(rightSidebar);
}

// move user info/control panel to the bottom of the page
//
locator = document.getElementById('headerbanner');
if (locator) {
    var parent = locator.parentNode;
    var footer = document.getElementById('copyfooter');
    parent.insertBefore(parent.removeChild(locator), footer);
}

// move site specific ads to bottom of message list page
//
locator = document.getElementById('WOTop');
if (locator) {
    var adTable = locator.nextSibling.nextSibling;
    var footer = document.getElementById('copyfooter');
    footer.parentNode.insertBefore(adTable.parentNode.removeChild(adTable), footer);
}
