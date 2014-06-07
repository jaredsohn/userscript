// ==UserScript==
// @name		DDO Forums Deb0rkifier
// @namespace	        http://forums.ddo.com
// @description	        DDO Forums Deb0rkifier
// @version		0.3.1
// @include		http://forums.ddo.com
// @include		http://forums.ddo.com/
// @include		http://forums.ddo.com/index.php
// @include		http://forums.ddo.com/showthread.php?*
// @include		http://forums.ddo.com/search.php?searchid=*
// ==/UserScript==

var lookup = [
	['Melees', 22, 2, [ ['Monk','Monk01'], ['Paladin','Paladin01'], ['Fighter', 'FIghter01'], ['Barbarian', 'Barbarian01'] ] ],
	['Specialists', 23, 2, [ ['Rogue','Rogue01'], ['Ranger','Ranger01'], ['Bard', 'Bard01'] ] ],
	['Spell casters', 29, 2, [ ['Wizard','Wizard01'], ['Sorcerer','Sorcerer01'], ['Favored Soul', 'FavSoul01'], ['Cleric', 'Cleric01'] ] ],
	['Races', 31, 1, [ ['Warforged','Warforged01'], ['Human','Human01'], ['Half-orc','Halforc01'], ['Halfling','Halfling01'], ['Half-elf','Halfelf01'], ['Elf','Elf01'], ['Dwarf','Dwarf01'], ['Drow','Drow01'] ] ]
];

var tab = '\u00A0\u00A0\u00A0\u00A0'
var URL_base = 'http://forums.ddo.com/search.php?do=process&nocache=1&prefixchoice[]='

function getMainDiv(forum, name) {
	var divs = document.evaluate("//div[a[@href='forumdisplay.php?f="+forum+"']='"+name+"']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return divs.snapshotItem(0);
}

function getSearchLink(name, code) {
	var newA = document.createElement('a');
	newA.href = URL_base + code;
	newA.appendChild(document.createTextNode(name));
	return newA;
}

function getCode(name) {
	for (var i in lookup) {
		var group = lookup[i];
		for (var c in group[3]) {
			var cls = group[3][c];
			if (cls[0] == name) {
				return cls[1];
			}
		}
	}
}

function insertMainLink(oldDiv, indent, name, code) {
	var newDiv = document.createElement('div');
	newDiv.className = "smallfont alt2"
	newDiv.setAttribute("style","border: none; padding-bottom: 2px;");
	newDiv.setAttribute("onmouseover","this.className='smallfont alt1'");
	newDiv.setAttribute("onmouseout","this.className='smallfont alt2'");
	for(var x=0; x < indent; x++)
		newDiv.appendChild(document.createTextNode(tab));
	var newA = getSearchLink(name, code);
	newDiv.appendChild(newA);
	oldDiv.parentNode.insertBefore(newDiv, oldDiv.nextSibling);
}
function insertNavLink(oldSpan, name, code) {
	var newSpan = document.createElement('span');
	newSpan.className = "navbar";
	newSpan.appendChild(document.createTextNode(" > "));
	var newA = getSearchLink(name, code);
	newSpan.appendChild(newA);
	oldSpan.parentNode.insertBefore(newSpan, oldSpan.nextSibling);
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

try {
	var metaTitle = trim(document.evaluate("//head/meta[@name='keywords']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getAttribute("content").split(", ddo,dungeons,dragons")[0]);

	var title = trim(document.evaluate("//td[@class='navbar']/strong",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).firstChild.nodeValue);
} catch(err) {}

var prefix;
if (metaTitle != null && title != null && trim(title.substr(title.length - metaTitle.length, metaTitle.length)) == metaTitle) {
	prefix = trim(title.substr(0, title.length - metaTitle.length));
}
var forumSpan = document.evaluate("//td[@width='100%']/span[@class='navbar' and position() = last()][a]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

for (var i in lookup) {
	var group = lookup[i];
	var div = getMainDiv(group[1],group[0]);
	for (var c in group[3]) {
		var cls = group[3][c];
		if (div != null) {
			insertMainLink(div, group[2], cls[0], cls[1]);
		}
		if (prefix != null && forumSpan != null) {
			forumName = trim(forumSpan.firstChild.nextSibling.firstChild.nodeValue);
			if (forumName == group[0] || forumName == "Custom Character Builds") {
				if (prefix == cls[0]) {
					insertNavLink(forumSpan, cls[0], cls[1]);
				}
			}
		}
	}
}

var threadElems = document.evaluate("//table[@id='threadslist']/tbody/tr[td/img]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < threadElems.snapshotLength; i++) {
	var row = threadElems.snapshotItem(i);
	//alert(row.innerHTML);
	try {
		var titleLink = document.evaluate("td/div/a[last()]",
				row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

		var row_prefix = trim(titleLink.previousSibling.nodeValue);
		var forumLink = document.evaluate("td[last()]/a",
				row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	} catch(err) {}
	if (row_prefix != "" && forumLink != null) {
		var code = getCode(row_prefix);
		if (code != null && code != "") {
			forumLink.parentNode.appendChild(document.createTextNode(" > "));
			var newA = getSearchLink(row_prefix, code);
			forumLink.parentNode.appendChild(newA);
			titleLink.previousSibling.nodeValue = " ";
		}
	}
}
