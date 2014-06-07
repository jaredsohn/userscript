// ==UserScript==
// @name           Remove Scores from Fixtures List
// @namespace      None
// @include        http://soccernet*.espn.go.com/*fixtures?*
// @include        http://soccernet*.espn.go.com/*results?*
// @include        http://soccernet*.espn.go.com/*scoreboard?*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
    if (thisLink.innerHTML.search(/[0-9] - [0-9]/) > -1) {
        thisLink.setAttribute('title',thisLink.innerHTML);
        thisLink.innerHTML = "(hidden)";
    }
    if (thisLink.innerHTML.search(/[0-9]&nbsp;-&nbsp;[0-9]/) > -1) {
        var newstring = thisLink.innerHTML.replace(/&nbsp;/g," ");
        thisLink.setAttribute('title',newstring);
        thisLink.innerHTML = "(hidden)";
    }  
}

allLinks = document.evaluate(
    '//td',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
    if (thisLink.innerHTML.search(/[0-9] - [0-9]/) > -1) { 
        thisLink.setAttribute('title',thisLink.innerHTML);
        thisLink.innerHTML = "(hidden)";
    }
    if (thisLink.innerHTML.search(/[0-9]&nbsp;-&nbsp;[0-9]/) > -1) {
        var newstring = thisLink.innerHTML.replace(/&nbsp;/g," ");
        thisLink.setAttribute('title',newstring);
        thisLink.innerHTML = "(hidden)";
    }  
}