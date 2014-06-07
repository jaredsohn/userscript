// ==UserScript==
// @name           SOFU Answer Highlighter
// @namespace      StackOverflow
// @description    Adds a highlight to the accepted answer
// @include        http://superuser.com/*
// @include		   http://stackoverflow.com/*
// @include	       http://meta.stackoverflow.com/*
// @include		   http://serverfault.com/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='answer accepted-answer']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.backgroundColor = "#eeffee";
}