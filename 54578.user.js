// ==UserScript==
// @name           BvS Lookup Linkifier
// @namespace      BvS
// @include        http://*animecubed.com/billy/bvs/*
// @description    Inserts village lookup link on ninja lookup page.
// ==/UserScript==

var reVillage = /^(\w[\w\d\s]+) Village$/;

function ecansolLink(name)
{
	var link = document.createElement("a");
	link.href = "http://bvs.ecansol.com/?page=panalyservillage&village=" + escape(name);
	link.setAttribute("style", "font-weight: bold; color: inherit;");
	link.textContent = name + " Village";
	return link;
}

function vlookupLink(name)
{
	var link = document.createElement("a");
	link.href = "vlookup.html?village=" + escape(name);
	link.textContent = name + " Village";
	return link;
}

function villageNameNonKaiju()
{
	var textSnap = document.evaluate("//table/tbody/tr/td/text()", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var txtnode;
	for (var i = 0; txtnode = textSnap.snapshotItem(i); i++)
		if (reVillage.test(txtnode.textContent))
			return {name: RegExp.lastParen, node: txtnode, kaiju: false};
	return null;
}

function villageNameKaiju()
{
	var textSnap = document.evaluate("//table/tbody/tr/td/center/i/i/b/text()", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var txtnode;
	for (var i = 0; txtnode = textSnap.snapshotItem(i); i++)
		if (reVillage.test(txtnode.textContent))
			return {name: RegExp.lastParen, node: txtnode, kaiju: true};
	return null;
}

if (/bvs.lookup\b/.test(location.href)) {
	var village = villageNameNonKaiju() ||  villageNameKaiju();
	if (!village)
		return;

	var link = vlookupLink(village.name);
	if (village.kaiju)
		link.setAttribute("style", "color: white");
	else
		link.setAttribute("style", "color: black");
	village.node.parentNode.replaceChild(link, village.node);

	var link2 = ecansolLink(village.name);
	link2.textContent = "[?]";
	if (link.nextSibling)
		link.parentNode.insertBefore(link2, link.nextSibling);
	else
		link.parentNode.appendChild(link2);
} else if (/bvs.vlookup\b/.test(location.href) || /bvs.village\b/.test(location.href)) {
	var nodes = document.evaluate("//table//td//b", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		var txt = node.textContent;
		if (reVillage.test(txt)) {
			var name = RegExp.lastParen;
			var link = ecansolLink(name);
			node.parentNode.replaceChild(link, node);
			break;
		}
	}
}
