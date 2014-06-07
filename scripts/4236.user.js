// ==UserScript==
// @name          Slashdot Face Lift 
// @namespace     http://stalag99.net
// @description	  Tightens up the sloppy CSS to be more like the old layout
// @include       http://slashdot.org/*
// @include       http://*.slashdot.org/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)


var allDivs, thisDiv;

// Userbar under the title.
allDivs = document.evaluate(
    "//div[@id='user-section']/div[@class='content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="1px 8px 1px 8px";
}


// Various link menu titles.
allDivs = document.evaluate(
    "//div[@id='links']/*/div[@class='title']/h4",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="1px 8px 1px 32px";
}

// link menu items
allDivs = document.evaluate(
    "//div[@id='links']/*/div[@class='content']/ul/li/h2/a|//div[@id='links']/*/div[@class='content']/ul/li/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="1px 8px 1px 8px";
}

// Slashbox title
allDivs = document.evaluate(
    "//div[@id='slashboxes']/div[@class='block']/div[@class='title']/h4",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="4px 8px 4px 8px";
}

// Slashbox Menu-like content
allDivs = document.evaluate(
    "//div[@id='slashboxes']/div[@class='block']/div[@class='content']/ul/li",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="1px 8px 1px 8px";
    thisDiv.style.fontSize="93%";
}

allDivs = document.evaluate(
    "//div[@id='slashboxes']/div[@class='block']/div",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="1px 1px 1px 1px";
}

// Article titles
allDivs = document.evaluate(
    "//div[@class='title']/h3",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="1px 8px 1px 8px";
}

allDivs = document.evaluate(
    "//div[@class='details']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="0px 8px 0px 8px";
}

// bottom links on article
allDivs = document.evaluate(
    "//div[@class='storylinks']/div/ul",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//alert(allDivs.snapshotLength);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    var thisDivStyle;
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.padding="2px 8px 2px 8px";
}

