// ==UserScript==
// @name          MobyGames lists
// @author        Sean Flanigan
// @version       1.0
// @namespace     http://flanigan.org/mobygames/
// @description   Improves the usability of "have lists" on MobyGames by adding direct [edit] links to every game in the list
// @include       http://www.mobygames.com/user/sheet/*/havelist*
// ==/UserScript==

function insertAfter(oldNode, newNode) {
	oldNode.parentNode.insertBefore(newNode, oldNode.nextSibling);
}

function addLinks(node, id) {
	insertAfter(node, document.createTextNode(" "))
	viewLink = document.createElement("a");
	viewLink.href = node.href.replace(/\/view\//, '/edit/');
	viewLink.insertBefore(document.createTextNode(" [edit]"), null);
	viewLink.style.color = 'red';
	node.parentNode.appendChild(viewLink);

	node.href = node.href.replace(/\/edit\//, '/view/');
}

var xpath = "//table[@id='mof_object_list']/tbody/tr/td/a[@href][1]";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for (var i = 0; i < result.snapshotLength; i++) {
	addLinks(result.snapshotItem (i), i);
}
