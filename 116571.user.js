// ==UserScript==
// @name		real name for programers club
// @author		Bokor
// @datecreated	        2011-10-28
// @lastupdated	        2011-10-31
// @include		http*://clubs.dir.bg/*
// @version		0.4
// ==/UserScript==

var oldName = "Програмисти";
var newName = "Интернет олигофрени";
var pattern = new RegExp("((?:<[^>]+>\s*)?)".concat(oldName, "((?:\s*<[^>]+>)?)") ,"g");
var nodesContainingSearchString = document.evaluate("//*[normalize-space(.)='".concat(oldName, "']"), document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for (var i = 0; i < nodesContainingSearchString.snapshotLength; i++){
    var currentNode = nodesContainingSearchString.snapshotItem(i);
    currentNode.innerHTML = currentNode.innerHTML.replace(pattern,"$1".concat(newName, "$2"));
}