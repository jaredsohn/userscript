// ==UserScript==
// @name        Gutenberg.org English Books
// @namespace   https://userscripts.org/users/497175
// @description Show only English books in book list
// @include     http://*gutenberg.org*
// @version     0.0.1
// ==/UserScript==

var allItems, thisItem;
var logging = true;
allItems = document.evaluate("//li[not(contains(text(),'(English)'))] | //li[contains(@class, 'pgdbaudio')] | //li[contains(@class, 'pgdbxlink')]",
 				    document, 
				    null, 
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
				    null);
                    
for(var i=0; i < allItems.snapshotLength; i++ ){
	thisItem = allItems.snapshotItem(i);
	thisItem.style.display = "none";
	thisItem.parentNode.removeChild(thisItem);	
}
