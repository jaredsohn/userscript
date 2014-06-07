// ==UserScript==
// @name           MySpace Group Shortcuts
// @namespace      Adrian232
// @description    Add Group Shortcuts under links to groups.
// @include        http://*myspace.com/*
// ==/UserScript==

links = document.evaluate("//a[img and contains(@href, 'groups.groupProfile')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; links && i < links.snapshotLength; i++) {
		var g = links.snapshotItem(i);
		var groupID = groupIdFromHttp(g.href);
		if (groupID)
			loadShortcuts(g, groupID);
}

function loadShortcuts(group, id) {
	var div = document.createElement("DIV"), a, txt;
	
	a = document.createElement("A");
	a.href = "http://groups.myspace.com/index.cfm?fuseaction=groups.join&groupID=" + id + "&groupName=this%20group";
	txt = document.createTextNode("Join");
	a.appendChild(txt); div.appendChild(a);
	
	div.appendChild(document.createElement("BR"));
	
	a = document.createElement("A");
	a.href = "http://groups.myspace.com/index.cfm?fuseaction=groups.resign&groupID=" + id + "&groupName=this%20group";
	txt = document.createTextNode("Resign");
	a.appendChild(txt); div.appendChild(a);
	
	if (group.parentNode && group.nextSibling)
		group.parentNode.insertBefore(div, group.nextSibling);
	else if (group.parentNode)
		group.parentNode.appendChild(div);
}

function groupIdFromHttp(request) {
	var groupMatch = request && request.match(/groupid=([0-9]*)/i);
	return (request && groupMatch) ? groupMatch[1] : null;
}
