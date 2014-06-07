// ==UserScript==
// @name           ICCup Matchlists Link
// @namespace      iccup
// @include        http://sc.iccup.com/*
// ==/UserScript==

// I copied this nice helper function from some other users script
function xpath(node, expr) {
	var resultSet =  document.evaluate(expr, node, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var found = [];
	var res;
	for (var i = 0; i < resultSet.snapshotLength; i++) {
		found.push(resultSet.snapshotItem(i));
	}
	return found;
}

function addLinks(node, replaceText) {
	//create 2x2 link
	var newATag = document.createElement("a");
	newATag.style.marginLeft = "5px";
	var myText = document.createTextNode("2x2");
	newATag.appendChild(myText);
	newATag.href = node.href.replace(replaceText, 'iccmatchlist') + '2x2/';

	//create 1x1 link
	var newATag2 = document.createElement("a");
	newATag2.style.marginLeft = "5px";
	var myText2 = document.createTextNode("1x1");
	newATag2.appendChild(myText2);
	newATag2.href = node.href.replace(replaceText, 'iccmatchlist') + '1x1/';

	//insert the links in the DOM tree
	node.parentNode.insertBefore(newATag, node.nextSibling);
	node.parentNode.insertBefore(newATag2, newATag);
}

//
// insert links to the player's 1x1 and 2x2 matchlist
// (it points already at the gaming profile)
//
var nodes = xpath(document.body, "//a[contains(@href,'iccscprofile')]");
for (var i = 0; i < nodes.length; i++) {
	addLinks(nodes[i], 'iccscprofile');
}

//
// insert links to the player's 1x1 and 2x2 matchlist
// and change link to point to the gaming profile
//
var nodes = xpath(document.body, "//a[contains(@href,'iccprofile')]");
for (var i = 0; i < nodes.length; i++) {
	addLinks(nodes[i], 'iccprofile');

	//change profile link to point to gaming profile
	nodes[i].href = nodes[i].href.replace('iccprofile', 'iccscprofile');
}

//If we are on 2v2 matchlist page
if (window.location.href.match('http://sc.iccup.com/iccmatchlist/.*/2x2/'))
{
	//
	// rewrite country links (flags) to point to the country's 2x2 ladder (not 1v1)
	//
	var nodes = xpath(document.body, "//a[contains(@href,'iccladder')]");
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].href = nodes[i].href.replace('1x1', '2x2');
	}
}

//Add a link to the clanleague tables where ever a division is linked (except on the tables page)
if (window.location.href != 'http://sc.iccup.com/iccclanleague/')
{
	var nodes = xpath(document.body, "//a[contains(@href,'iccschedule')]");
	for (var i = 0; i < nodes.length; i++) {
		var newATag = document.createElement("a");
		newATag.style.marginLeft = "10px";
		var myText = document.createTextNode("Tables");
		newATag.appendChild(myText);
		newATag.href = 'http://sc.iccup.com/iccclanleague/';

		nodes[i].parentNode.insertBefore(newATag, nodes[i].nextSibling);
	}
}
