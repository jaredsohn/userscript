// ==UserScript==
// @name           Ebay-Location-Route
// @namespace      www.ebay.co.uk
// @description    Adds a link for the item location on google maps 
// @include       http://*ebay.*
// ==/UserScript==
// Version 0.4
// author: knoe, updates by MoJo


//Configuration
var home = "mah house"; //home
var blank = false;				   //open link on a blank page?
//Config end


//it looks like ebay changes a lot :)
var ebayClass= new Array("titlePurchase", "sh-DlvryDtl");

for (var j = 0; j < ebayClass.length; j++)
{
	//check each element of the ebayClass
	for (var i = 0; i<document.getElementsByClassName(ebayClass[j]).length; i++)
	{

		//if the location has been found do the link stuff
		var toCheck = document.getElementsByClassName(ebayClass[j])[i].firstChild.data;
		if (toCheck.search("Item location") != -1)
		{
			var place = toCheck.slice(15);
			//the google map route link
			var linkRef = "http://maps.google.co.uk/maps?saddr="+home+"&daddr="+place;

			//create the link
			var link = document.createElement('a');
			link.href = linkRef;
			if (blank)
				link.target="_blank";
			var linkText = document.createTextNode(place);
			link.appendChild(linkText);

			document.getElementsByClassName(ebayClass[j])[i].firstChild.data="Item location: ";
			document.getElementsByClassName(ebayClass[j])[i].appendChild(link);
	
			return;
		}
	}
}
