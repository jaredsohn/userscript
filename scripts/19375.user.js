// ==UserScript==
// @name           JHunz's KOL Mall search separator
// @namespace      hunsley@gmail.com
// @description    When searching for cheapest x items, each type of item is separated by a horizontal rule
// @include        *kingdomofloathing.com/searchmall.php*
// ==/UserScript==

// Requested here: 
// http://forums.kingdomofloathing.com:8080/vb/showpost.php?p=2659559&postcount=285

// V1.1 1/14/2009  Now works properly when there is less than the requested number of items available.  Thanks to Hellion.

var cheapOnly = document.evaluate('//form[@name="searchform1"]//input[@name="cheaponly"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
if ((!cheapOnly)||(!cheapOnly.checked)) {
	return false;
}
else {
	var numCheap = parseInt(document.evaluate('//form[@name="searchform1"]//input[@name="shownum"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.value);
	//var searchFormNode = document.getElementsByName("searchform1").item(0);
	var searchTableRows = document.getElementsByName("searchform1").item(0).parentNode.getElementsByTagName("tr");
	
	if (searchTableRows.length <= (1+numCheap)) {
		return false;
	}
	else {
		var firststore = searchTableRows.item(1).textContent.toLowerCase();
		var firstitem = firststore.substring(0,firststore.indexOf('(')-1);
//		GM_log(firstitem);
		for (var i=2;i<(searchTableRows.length );i+=1) {
			var storetext = searchTableRows.item(i).textContent.toLowerCase();
			var storeitem = storetext.substring(0,storetext.indexOf('(') - 1 );
//			GM_log(storeitem);
			if (storeitem != firstitem) {
				firstitem = storeitem;
				var newElement = document.createElement("tr");
				var childOne = document.createElement("td");
				childOne.setAttribute("colspan",3);
				var childTwo = document.createElement("hr");
				childOne.appendChild(childTwo);
				newElement.appendChild(childOne);
				searchTableRows.item(i).parentNode.insertBefore(newElement,searchTableRows.item(i));
			}
		}
	}
	
}
