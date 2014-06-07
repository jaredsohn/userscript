// ==UserScript==
// // @name         Reddit - Top of Page 
// // @author       Lanulus
// // @namespace    lanulus@gmail.com
// // @description  Just adds a link to the top of the page at the bottom of the page.
// // @include      http://www.reddit.com/*
// // @include      http://reddit.com/*
// // ==/UserScript==

var nextprev = document.evaluate(
        "//p[@class='nextprev']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
if (nextprev.snapshotLength != 0) {
    nextprev.snapshotItem(0).innerHTML += " | ";

    var top = document.createElement("a");
    top.innerHTML = "top";
    top.href = location.href + "#";

    nextprev.snapshotItem(0).appendChild(top);
}
