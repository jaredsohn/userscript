// ==UserScript==
// @name       springsource_remove_tooltips
// @version    0.2.1
// @description  Removes annoying tooltips from Springsource's online documentation
// @match      http://static.springsource.org/*
// @match      http://docs.spring.io/*
// ==/UserScript==

// get all nodes with a title attribute regardless where they are in the document
var allNodesWithTitle = document.evaluate(
    "//*[@title]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// iterate through all of them and remove their title attribute
for (var i = 0; i < allNodesWithTitle.snapshotLength; i++) {
    var nodeWithTitle = allNodesWithTitle.snapshotItem(i)
    // console.log("remove title: " + nodeWithTitle.getAttribute("title") )
    nodeWithTitle.removeAttribute("title")
}