// ==UserScript==
// @name           KOL Inventory Zap stuff button
// @namespace      hunsley@gmail.com
// @description    Adds a zap stuff button to the row of action buttons in the inventory
// @include        *kingdomofloathing.com/inventory.php*
// @include        *kingdomofloathing.com/charpane.php*
// ==/UserScript==

// After obtaining the wand, visit the Misc. section of the inventory once to prime the script.

//Grab the character name from the character pane
if (window.location.pathname == "/charpane.php") {
	// Get the current name
	var charName = document.getElementsByTagName("b")[0].textContent;
	GM_setValue('curCharName',charName);
}
else {
	var charName = GM_getValue('curCharName','UNDEFINED');
}
if (charName == 'UNDEFINED') {
	return false;
}

whichWand = GM_getValue(charName + '.whichWand','UNDEFINED');

//try to find the appropriate link.  Update if different (from getting a new sort of wand)
wandLinkNode = document.evaluate('//a[contains(@href,"wand.php")]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
if(wandLinkNode) {
	if(!wandLinkNode.href.match(whichWand)) {
		//alert(wandLinkNode.href.split("wand.php\?")[1]);
		whichWand = wandLinkNode.href.split("wand.php\?")[1];
		GM_setValue(charName + '.whichWand',whichWand)
	}
}

if(whichWand != 'UNDEFINED') {
	zapLinkNode = document.createElement('a');
	with(zapLinkNode) {
		href = "wand.php?" + whichWand;
		textContent = '[zap stuff]';
	}

	sellStuffParent = document.evaluate('//a[@href="sellstuff.php"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.parentNode;
	with(sellStuffParent) {
		appendChild(document.createTextNode(' '));
		appendChild(zapLinkNode);
	}
}
	