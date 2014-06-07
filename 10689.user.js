// ==UserScript==
// @name           HarryPotterSpoiler
// @namespace      *
// @description    Hides spoilers
// ==/UserScript==


// Adapted From DumbQuotes
// version 0.4 BETA!
// 2005-05-02
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
//

var regex, key, textnodes, node, s;

var terms = new Array('spoiler', 'potter', 'rowling', 'hermione', 'wormtail', 'kreacher', 'weasley', 'ginny', 'malfoy', 'death eater', 'neville', 'longbottom', 'hagrid', 'dumbledore', 'flitwick', 'HP 7', 'HP VII', 'book 7', 'delacour', 'severus', 'snape', 'madeye', 'crabbe', 'goyle', 'skeeter', 'sirius', 'myrtle', 'voldemort', 'mcgonagall', 'dursley', 'diagon', 'ollivander', 'granger', 'dobby', 'shunpike', 'lupin', 'draco', 'slytherin', 'trelawney', 'rosmerta', 'quidditch', 'muggle', 'bellatrix', 'hallows', 'lovegood');
regex = {};
for (key in terms) {
    regex[key] = new RegExp(terms[key], 'gi');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    for(key in terms) {
	if (node.data.search(regex[key]) != -1)
	{
            node.data = '[ TEXT REMOVED ]';
		break;
	}
    }

}

