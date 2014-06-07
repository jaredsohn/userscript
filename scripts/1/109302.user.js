// ==UserScript==
// @name		PriceSpy Button Adder
// @namespace
// @author		Chris Rohlfs (verballydecapitating)
// @version	1.2
// @description	Shows buttons for all items on PriceSpy, not only selected paid stores.
// @include		http://pricespy.co.nz/product.php?p=*
// ==/UserScript==

//Store the nodes to edit later
var nodes = document.evaluate("//tr[@class='erow1' or @class='erow2']", document.documentElement, null, XPathResult.ANY_TYPE, null);

var rootNodeList = new Array();

while (node = nodes.iterateNext())
{
	if (node.attributes['onclick'] != null)
	{
		rootNodeList.push(node);
	}
}

//Load the item names from javascript data
var start = 0;
var itemNameList = new Array();

for (var i = 0; i < rootNodeList.length; i++)
{
	start = document.head.innerText.indexOf("beskrivning", start);
	if (start > -1)
	{
		start += 14;
		var end = document.head.innerText.indexOf('"', start);
		itemNameList.push(document.head.innerText.substring(start, end));
	}
}

console.log(itemNameList);
//Add the buttons! :)
var i = 0;
for (var i = rootNodeList.length - 1; i >= 0; --i)
{
	var node = rootNodeList[i];
	var storeName = node.childNodes[1].textContent.trim();
	var priceID = node.attributes['id'].value.substring(10).trim();
	
	if (storeName != "")
	{
		//console.log(node);
		var productName = itemNameList[i];
		var toolTipText = productName + ' -' + node.cells[5].innerText + ' at ' + storeName;
		var searchText = encodeURIComponent(storeName + " " + productName);
		var link = 'http://www.google.co.nz/search?sourceid=navclient&cr=countryNZ&q=' + searchText + '&btnI';
		
		node.cells[9].innerHTML = '<a class="linkbutton_dark " style="display:inline-block;width:200px;" href="' + link + '" target="_blank" rel="nofollow" title="' + toolTipText + '"><img class="i14w i14w_ext_link" src="/g/sp.gif"> To ' + storeName + '</a>';
	}
}